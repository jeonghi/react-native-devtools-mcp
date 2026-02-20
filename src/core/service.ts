import WebSocket from 'ws';
import { createPendingMap, resolvePending } from './cdpClient';
import { classifyCdpEvent } from './eventRouting';
import { RnMcpError, toRnCdpError, toRnMcpError } from './errors';
import { normalizeMetroUrl, resolveMetroUrl } from './metroUrl';
import { pickReconnectTarget } from './reconnect';
import { RingBuffer } from './ringBuffer';
import { createSessionStore } from './sessionStore';
import { listTargets } from './targetDiscovery';
import type { TargetSummary } from './types';

type PendingMap = ReturnType<typeof createPendingMap>;

type SessionInternal = {
  sessionKey: string;
  metroUrl?: string;
  target: TargetSummary;
  ws: WebSocket;
  nextId: number;
  pending: PendingMap;
  consoleEvents: RingBuffer<unknown>;
  networkEvents: RingBuffer<unknown>;
  debuggerEvents: RingBuffer<unknown>;
  exceptionEvents: RingBuffer<unknown>;
  lastSeenAt: number;
};

export type ConnectParams = {
  metroUrl?: string;
  webSocketDebuggerUrl?: string;
  targetId?: string;
  sessionKey?: string;
};

export class RnDebugService {
  private readonly sessions = new Map<string, SessionInternal>();
  private readonly store = createSessionStore();
  private readonly eventBufferSize: number;

  constructor(eventBufferSize = 500) {
    this.eventBufferSize = eventBufferSize;
  }

  async listTargets(metroUrl?: string) {
    const resolvedMetroUrl = await resolveMetroUrl(metroUrl);
    return listTargets(resolvedMetroUrl);
  }

  async connect(params: ConnectParams) {
    const metroUrl =
      params.metroUrl || !params.webSocketDebuggerUrl
        ? await resolveMetroUrl(params.metroUrl)
        : normalizeMetroUrl(process.env.METRO_URL ?? 'http://localhost:8081');

    let target: TargetSummary;

    if (params.webSocketDebuggerUrl) {
      target = {
        id: params.targetId ?? params.webSocketDebuggerUrl,
        title: 'Hermes',
        webSocketDebuggerUrl: params.webSocketDebuggerUrl,
      };
    } else {
      const result = await this.listTargets(metroUrl);
      target = this.pickTarget(result.targets, params.targetId);
    }

    const sessionKey = params.sessionKey ?? `${metroUrl}:${target.id}`;

    const existing = this.sessions.get(sessionKey);
    if (existing && existing.ws.readyState === WebSocket.OPEN) {
      return {
        sessionKey,
        connected: true,
        target: existing.target,
        metroUrl: existing.metroUrl ?? metroUrl,
      };
    }

    if (existing) {
      this.closeSession(sessionKey, 'RN_SESSION_CLOSED');
    }

    this.store.upsert({
      sessionKey,
      state: 'connecting',
      targetId: target.id,
      metroUrl,
    });

    const ws = await this.openWebSocket(target.webSocketDebuggerUrl);

    const session: SessionInternal = {
      sessionKey,
      metroUrl,
      target,
      ws,
      nextId: 1,
      pending: createPendingMap(),
      consoleEvents: new RingBuffer(this.eventBufferSize),
      networkEvents: new RingBuffer(this.eventBufferSize),
      debuggerEvents: new RingBuffer(this.eventBufferSize),
      exceptionEvents: new RingBuffer(this.eventBufferSize),
      lastSeenAt: Date.now(),
    };

    this.bindSocketHandlers(session);
    this.sessions.set(sessionKey, session);

    this.store.updateState(sessionKey, 'connected');

    await this.enableDefaults(sessionKey);

    return {
      sessionKey,
      connected: true,
      target,
      metroUrl,
    };
  }

  async disconnect(sessionKey: string) {
    this.requireSession(sessionKey);
    this.closeSession(sessionKey, 'RN_SESSION_CLOSED');
    return { disconnected: true };
  }

  async evaluate(
    sessionKey: string,
    expression: string,
    awaitPromise = true,
    returnByValue = true
  ) {
    return this.sendCommand(sessionKey, 'Runtime.evaluate', {
      expression,
      awaitPromise,
      returnByValue,
    });
  }

  async enableDebugger(sessionKey: string) {
    return this.sendCommand(sessionKey, 'Debugger.enable');
  }

  async pause(sessionKey: string) {
    return this.sendCommand(sessionKey, 'Debugger.pause');
  }

  async resume(sessionKey: string) {
    return this.sendCommand(sessionKey, 'Debugger.resume');
  }

  async stepOver(sessionKey: string) {
    return this.sendCommand(sessionKey, 'Debugger.stepOver');
  }

  async stepInto(sessionKey: string) {
    return this.sendCommand(sessionKey, 'Debugger.stepInto');
  }

  async stepOut(sessionKey: string) {
    return this.sendCommand(sessionKey, 'Debugger.stepOut');
  }

  async setBreakpointByUrl(
    sessionKey: string,
    params: {
      url: string;
      lineNumber: number;
      columnNumber?: number;
      condition?: string;
    }
  ) {
    return this.sendCommand(sessionKey, 'Debugger.setBreakpointByUrl', params);
  }

  async enableNetwork(sessionKey: string) {
    return this.sendCommand(sessionKey, 'Network.enable');
  }

  async cdpCall(
    sessionKey: string,
    method: string,
    params?: Record<string, unknown>
  ) {
    return this.sendCommand(sessionKey, method, params);
  }

  getRecentConsole(sessionKey: string, limit?: number) {
    const session = this.requireSession(sessionKey);
    return {
      events: session.consoleEvents.snapshot(limit),
    };
  }

  getRecentNetwork(sessionKey: string, limit?: number) {
    const session = this.requireSession(sessionKey);
    return {
      events: session.networkEvents.snapshot(limit),
    };
  }

  getRecentExceptions(sessionKey: string, limit?: number) {
    const session = this.requireSession(sessionKey);
    return {
      events: session.exceptionEvents.snapshot(limit),
    };
  }

  async reconnect(sessionKey: string) {
    const previous = this.requireSession(sessionKey);
    const metroUrl = previous.metroUrl;

    if (!metroUrl) {
      throw new RnMcpError(
        'RN_INVALID_INPUT',
        'Cannot reconnect session without metroUrl'
      );
    }

    this.store.updateState(sessionKey, 'reconnecting');

    const { targets } = await this.listTargets(metroUrl);
    const nextTarget = pickReconnectTarget(
      {
        id: previous.target.id,
        title: previous.target.title,
        app: previous.target.app,
        device: previous.target.device,
      },
      targets.map((target) => ({
        id: target.id,
        title: target.title,
        app: target.app,
        device: target.device,
      }))
    );

    if (!nextTarget) {
      this.store.updateState(sessionKey, 'failed', 'RN_TARGET_NOT_FOUND');
      throw new RnMcpError('RN_TARGET_NOT_FOUND', 'No reconnect target found');
    }

    this.closeSession(sessionKey, 'RN_SESSION_CLOSED');

    const connected = await this.connect({
      metroUrl,
      targetId: nextTarget.id,
      sessionKey,
    });

    return {
      reconnected: true,
      ...connected,
    };
  }

  getSessionStatus(sessionKey: string) {
    const session = this.requireSession(sessionKey);
    const stateRecord = this.store.get(sessionKey);

    return {
      state: stateRecord?.state ?? 'connected',
      lastSeenAt: session.lastSeenAt,
      target: session.target,
      capabilities: session.target.capabilities ?? {},
      bufferedCounts: {
        console: session.consoleEvents.size(),
        network: session.networkEvents.size(),
        debugger: session.debuggerEvents.size(),
        exceptions: session.exceptionEvents.size(),
      },
    };
  }

  private pickTarget(targets: TargetSummary[], targetId?: string): TargetSummary {
    if (targets.length === 0) {
      throw new RnMcpError('RN_TARGET_NOT_FOUND', 'No RN targets available');
    }

    if (targetId) {
      const found = targets.find((target) => target.id === targetId);
      if (!found) {
        throw new RnMcpError(
          'RN_TARGET_NOT_FOUND',
          `Target not found: ${targetId}`
        );
      }
      return found;
    }

    const hermes = targets.find((target) => {
      const label = `${target.title} ${target.vm ?? ''}`.toLowerCase();
      return label.includes('hermes');
    });

    return hermes ?? targets[0];
  }

  private async enableDefaults(sessionKey: string) {
    const defaults = ['Runtime.enable', 'Debugger.enable', 'Network.enable'];
    for (const method of defaults) {
      try {
        await this.sendCommand(sessionKey, method);
      } catch {
        // Best-effort: some RN targets won't support all domains.
      }
    }
  }

  private async openWebSocket(url: string): Promise<WebSocket> {
    return new Promise<WebSocket>((resolve, reject) => {
      const ws = new WebSocket(url);

      const timer = setTimeout(() => {
        ws.close();
        reject(
          new RnMcpError('RN_WS_CONNECT_FAILED', `WebSocket timeout: ${url}`)
        );
      }, 5000);

      ws.once('open', () => {
        clearTimeout(timer);
        resolve(ws);
      });

      ws.once('error', (error) => {
        clearTimeout(timer);
        reject(toRnMcpError(error));
      });
    });
  }

  private bindSocketHandlers(session: SessionInternal): void {
    session.ws.on('message', (data) => {
      const payload = this.safeJsonParse(data.toString());
      if (!payload) {
        return;
      }

      session.lastSeenAt = Date.now();

      if (typeof payload.id === 'number') {
        resolvePending(session.pending, payload);
        return;
      }

      if (typeof payload.method !== 'string') {
        return;
      }

      const eventKind = classifyCdpEvent(payload.method);

      if (eventKind === 'console') {
        session.consoleEvents.push(payload);
      } else if (eventKind === 'network') {
        session.networkEvents.push(payload);
      } else if (eventKind === 'debugger') {
        session.debuggerEvents.push(payload);
      } else if (eventKind === 'exception') {
        session.exceptionEvents.push(payload);
        // Runtime exceptions are critical for app crash diagnosis, so mirror them in console feed too.
        session.consoleEvents.push(payload);
      }
    });

    session.ws.on('close', () => {
      this.store.updateState(session.sessionKey, 'degraded', 'RN_SESSION_CLOSED');
      session.pending.rejectAll(new Error('RN_SESSION_CLOSED'));
    });

    session.ws.on('error', () => {
      this.store.updateState(
        session.sessionKey,
        'degraded',
        'RN_WS_CONNECT_FAILED'
      );
    });
  }

  private safeJsonParse(value: string): Record<string, unknown> | undefined {
    try {
      return JSON.parse(value) as Record<string, unknown>;
    } catch {
      return undefined;
    }
  }

  private requireSession(sessionKey: string): SessionInternal {
    const session = this.sessions.get(sessionKey);
    if (!session) {
      throw new RnMcpError(
        'RN_SESSION_NOT_FOUND',
        `Not connected: ${sessionKey}`
      );
    }
    return session;
  }

  private closeSession(sessionKey: string, reason: string): void {
    const session = this.sessions.get(sessionKey);
    if (!session) {
      return;
    }

    session.pending.rejectAll(new Error(reason));
    session.ws.removeAllListeners();
    session.ws.close();
    this.sessions.delete(sessionKey);
    this.store.remove(sessionKey);
  }

  private async sendCommand(
    sessionKey: string,
    method: string,
    params?: Record<string, unknown>
  ) {
    const session = this.requireSession(sessionKey);
    const id = session.nextId++;
    const pendingResult = session.pending.create(id, 5000);

    await new Promise<void>((resolve, reject) => {
      session.ws.send(
        JSON.stringify({ id, method, params }),
        (error?: Error) => {
          if (error) {
            const pending = session.pending.take(id);
            if (pending) {
              pending.reject(error);
            }
            reject(new RnMcpError('RN_WS_CONNECT_FAILED', error.message));
            return;
          }
          resolve();
        }
      );
    });

    const response = (await pendingResult) as {
      result?: unknown;
      error?: { code?: number; message?: string; data?: unknown };
    };

    if (response.error) {
      throw toRnCdpError(method, response.error);
    }

    return response.result ?? {};
  }
}
