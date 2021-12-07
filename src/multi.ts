import * as path from 'path';
import { Worker, workerData } from 'worker_threads';

import { indexChunks } from './utils';

/**
 * For the sake of this demonstration, we're using
 * https://github.com/piscinajs/piscina!
 *
 * An alternative implementation can be found in the src/sequential
 * directory.
 */
import { executeTask, killThreadPool } from './pool';

import { MAX_PRIME, NUM_THREADS, NUM_WORKER_THREADS } from './config';

/**
 * A SharedArrayBuffer is necessary for this experiment since we
 * intend to use the same indices of memoery for modifying the same
 * array.
 *
 * More information on: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer
 */
const SHARED_BUFFER = new SharedArrayBuffer(Int8Array.BYTES_PER_ELEMENT * (MAX_PRIME + 1));
const ALL_NUMBERS: Int8Array = new Int8Array(SHARED_BUFFER).fill(1);
ALL_NUMBERS[0] = ALL_NUMBERS[1] = 0;

function _findParallelPrimes(): Promise<void>[] {
  const chunks = indexChunks(ALL_NUMBERS, NUM_WORKER_THREADS, MAX_PRIME);

  const threadJobs: Promise<void>[] = [];

  for (let prime = 2; prime <= Math.sqrt(MAX_PRIME); prime++) { 
    const promises = chunks.map(chunk => executeTask({ ALL_NUMBERS, CHUNK_INDICES: chunk, PRIME: prime }));
    threadJobs.push(...promises);
  }

  return threadJobs;
}

/**
 * Calculate primes with NUM_THREADS threads
 */
async function calculatePrimes(): Promise<void> {
  const start = process.hrtime.bigint();
  await Promise.all(_findParallelPrimes());
  const end = process.hrtime.bigint();

  const primes = ALL_NUMBERS.map((value, index) => value === 1 ? index : -1).filter(value => value !== -1);
  console.log(`Took ${Number(end - start) / 1000000} milliseconds`);
  console.log(`Number of primes: ${primes.length}`);

  await killThreadPool();
}

export { calculatePrimes }
