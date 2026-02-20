import { RnDebugService } from '../src/core/service';

async function run() {
  const service = new RnDebugService();

  const targets = await service.listTargets(process.env.METRO_URL);
  console.log(`[smoke] metroUrl=${targets.metroUrl}`);
  console.log(`[smoke] targets=${targets.targets.length}`);

  if (targets.targets.length === 0) {
    throw new Error('RN_TARGET_NOT_FOUND: No targets found. Launch RN app on device/simulator.');
  }

  const connected = await service.connect({ metroUrl: targets.metroUrl });
  console.log(`[smoke] connected session=${connected.sessionKey}`);

  const evaluated = await service.evaluate(
    connected.sessionKey,
    'globalThis.__DEV__',
    true,
    true
  );
  console.log(`[smoke] eval=${JSON.stringify(evaluated)}`);

  await service.disconnect(connected.sessionKey);
  console.log('[smoke] disconnected');
}

run().catch((error) => {
  console.error(`[smoke] failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
