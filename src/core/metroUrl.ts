import { RnMcpError } from './errors';

const DEFAULT_METRO_PORT_CANDIDATES = [8081, 8082, 8083, 8088, 8090, 19000];

export function normalizeMetroUrl(metroUrl: string): string {
  return metroUrl.trim().replace(/\/$/, '');
}

function parseMetroPortCandidates(value?: string): number[] {
  if (!value || value.trim().length === 0) {
    return DEFAULT_METRO_PORT_CANDIDATES;
  }

  const parsed = value
    .split(',')
    .map((entry) => Number(entry.trim()))
    .filter((port) => Number.isInteger(port) && port > 0 && port <= 65535);

  return parsed.length > 0 ? parsed : DEFAULT_METRO_PORT_CANDIDATES;
}

async function isMetroReachable(baseUrl: string): Promise<boolean> {
  const probeEndpoints = ['/json/version', '/json/list'];

  for (const endpoint of probeEndpoints) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`);
      if (response.ok) {
        return true;
      }
    } catch {
      // Try next probe endpoint / candidate.
    }
  }

  return false;
}

export async function resolveMetroUrl(metroUrl?: string): Promise<string> {
  if (metroUrl && metroUrl.trim().length > 0) {
    return normalizeMetroUrl(metroUrl);
  }

  const envMetroUrl = process.env.METRO_URL;
  if (envMetroUrl && envMetroUrl.trim().length > 0) {
    return normalizeMetroUrl(envMetroUrl);
  }

  const candidatePorts = parseMetroPortCandidates(
    process.env.METRO_PORT_CANDIDATES
  );

  for (const port of candidatePorts) {
    const candidateUrl = `http://localhost:${port}`;
    if (await isMetroReachable(candidateUrl)) {
      return candidateUrl;
    }
  }

  throw new RnMcpError(
    'RN_METRO_UNREACHABLE',
    `Metro not reachable. Checked ports: ${candidatePorts.join(', ')}`
  );
}
