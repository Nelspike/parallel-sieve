import * as path from 'path';
import { Worker } from 'worker_threads';

import { NUM_WORKER_THREADS } from '../config';

interface PrimeWorkerData {
  ALL_NUMBERS: Int8Array;
  CHUNK_INDICES: number[];
  PRIME: number;
  TERMINATE?: boolean;
}

const THREADS = new Array(NUM_WORKER_THREADS).fill(new Worker(path.resolve(__dirname, './worker.js')));
let LAST_THREAD = -1;

function _pickThread(): Worker {
  LAST_THREAD = ++LAST_THREAD > THREADS.length - 1 ? 0 : LAST_THREAD;
  return THREADS[LAST_THREAD];
}

async function killThreadPool(): Promise<void> {
  for (const thread of THREADS) {
    thread.postMessage({ TERMINATE: true });
  }
}

async function executeTask(workerData: PrimeWorkerData): Promise<void> {
  return new Promise((resolve, reject) => {
    const thread = _pickThread();

    function onError(error: Error) {
      /**
       * Panic and exit!
       */
      reject(error);
    }

    function onMessage(data: { start: bigint, end: bigint }) {
      resolve();

      thread.removeListener('error', onError);
      thread.removeListener('message', onMessage);

      // const { start, end } = data;
      // console.log(`Thread took ${Number(end - start) / 1000000} milliseconds for a chunk of size ${CHUNK_INDICES[1] - CHUNK_INDICES[0] + 1}`);
    }

    thread.on('error', onError);
    thread.on('message', onMessage);

    thread.postMessage(workerData);
  });
}

export { executeTask, killThreadPool }
