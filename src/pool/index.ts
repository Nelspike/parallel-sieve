import * as path from 'path';
import Piscina from 'piscina';
import { Worker, workerData } from 'worker_threads';

import { NUM_WORKER_THREADS } from '../config';

interface PrimeWorkerData {
  ALL_NUMBERS: Int8Array;
  CHUNK_INDICES: number[];
  PRIME: number;
  TERMINATE?: boolean;
}

const THREAD_POOL = new Piscina({
  filename: path.resolve(__dirname, './worker.js'),
  minThreads: NUM_WORKER_THREADS || 1, // Failsafe for demo purposes
  maxThreads: NUM_WORKER_THREADS || 1,
});

function executeTask(data: PrimeWorkerData): Promise<void> {
  return THREAD_POOL.run(data);
}

function killThreadPool(): Promise<void> {
  return THREAD_POOL.destroy();
}

export { executeTask, killThreadPool }
