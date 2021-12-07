function indexChunks(array: Int8Array, nChunks: number, maxIndex: number): number[][] {
  const chunkSize = Math.ceil(array.length / nChunks);
  return Array.from({ length: nChunks }, (v, i) =>
    [i * chunkSize, Math.min(i * chunkSize + chunkSize - 1, maxIndex)]
  ).filter(chunk => chunk.length !== 0);
}

export { indexChunks }
