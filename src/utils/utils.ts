export function getSymbolFor(key: string | symbol): symbol {
  return typeof key === 'string' ? Symbol.for(key) : key;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function enumKeysToArray<T>(o: any): T[] {
  return (Object.keys(o) as unknown as T[]).filter((value) => isNaN(Number(value))).map((key) => key);
}
