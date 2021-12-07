export default (workerData: any) => {
  const { ALL_NUMBERS, CHUNK_INDICES, PRIME } = workerData;

  const start = process.hrtime.bigint();
  const minMultiple = Math.max(PRIME, Math.floor(CHUNK_INDICES[0] / PRIME));

  for (let i = minMultiple; PRIME * i <= CHUNK_INDICES[1]; i++) {
    ALL_NUMBERS[PRIME * i] = 0;
  }

  const end = process.hrtime.bigint();

  return { start, end };
}
