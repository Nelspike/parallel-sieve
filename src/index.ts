import { cpus } from 'os';
import { MAX_PRIME, NUM_THREADS } from './config';

import { calculatePrimes as singleThreadPrimes } from './single';
import { calculatePrimes as multiThreadPrimes } from './multi';

console.log(`Calculating first ${MAX_PRIME} primes with ${NUM_THREADS} thread${NUM_THREADS === 1 ? '' : 's'} with ${cpus().length} CPUs...`);

if (NUM_THREADS === 1) {
  singleThreadPrimes();
} else {
  /**
   * Top-Level await would be nice here, but this chap's right:
   * https://gist.github.com/Rich-Harris/0b6f317657f5167663b493c722647221
   */
  multiThreadPrimes();
}
