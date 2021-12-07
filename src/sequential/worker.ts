import { parentPort, workerData } from 'worker_threads';

parentPort!.on('message', workerData => {
  const { ALL_NUMBERS, CHUNK_INDICES, PRIME, TERMINATE } = workerData;

  if (TERMINATE) {
    process.exit(0);
  }

  const start = process.hrtime.bigint();
  const minMultiple = Math.max(PRIME, Math.floor(CHUNK_INDICES[0] / PRIME));

  for (let i = minMultiple; PRIME * i <= CHUNK_INDICES[1]; i++) {
    ALL_NUMBERS[PRIME * i] = 0;
  }

  const end = process.hrtime.bigint();

  parentPort!.postMessage({ start, end });
});
