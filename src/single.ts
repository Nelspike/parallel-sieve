import { MAX_PRIME } from './config';

/**
 * Calculate primes with just one thread (the main thread)
 */
function calculatePrimes(): void {
  const ALL_NUMBERS: number[] = new Array(MAX_PRIME + 1).fill(1);
  ALL_NUMBERS[0] = ALL_NUMBERS[1] = 0;

  const start = process.hrtime.bigint();

  for (let prime = 2; prime <= Math.sqrt(MAX_PRIME); prime++) {
    for (let i = 2; prime * i <= MAX_PRIME; i++) {
      ALL_NUMBERS[prime * i] = 0;
    }
  }

  const end = process.hrtime.bigint();

  const primes = ALL_NUMBERS
    .map((value, index) => value === 1 ? index : -1)
    .filter(value => value !== -1);

  console.log(`Took ${Number(end - start) / 1000000} milliseconds`);
  console.log(`Number of primes: ${primes.length}`);
}

export { calculatePrimes }
