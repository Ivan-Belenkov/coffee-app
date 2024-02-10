export function getSymbolFor(key: string | symbol): symbol {
  return typeof key === 'string' ? Symbol.for(key) : key;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function enumKeysToArray<T>(o: any): T[] {
  return (Object.keys(o) as unknown as T[]).filter((value) => isNaN(Number(value))).map((key) => key);
}

export function getUniqueArray<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

export function strToHexColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = (hash & 0x00ffffff).toString(16).toUpperCase();
  return `#${'00000'.substring(0, 6 - color.length)}${color}`;
}
