const DEFAULT_MAX_PRIME = 100;
const DEFAULT_NUM_THREADS = 1;

const MAX_PRIME = parseInt(process.env.MAX_PRIME || '', 10) || DEFAULT_MAX_PRIME;

/**
 * We want a minimum of two threads for multi-threaded processes!
 * This does not include the main thread.
 */
function parseThreads(threads: string | undefined): number {
  if (threads === undefined) {
    return DEFAULT_NUM_THREADS;
  }

  const nThreads = parseInt(process.env.NUM_THREADS || '', 10);

  if (nThreads <= 0) {
    throw new Error('We need at least 1 extra thread to have multi-threaded processes!')
  }

  return nThreads;
}

const NUM_THREADS = parseThreads(process.env.NUM_THREADS);
const NUM_WORKER_THREADS = NUM_THREADS - 1;

export { MAX_PRIME, NUM_THREADS, NUM_WORKER_THREADS };
