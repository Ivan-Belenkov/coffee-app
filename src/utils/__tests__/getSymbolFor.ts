import { getSymbolFor } from 'src/utils/utils';

describe('getSymbolFor', () => {
  it('should return a symbol for a string', () => {
    const key = 'test';
    const symbol = getSymbolFor(key);
    expect(typeof symbol).toBe('symbol');
    expect(Symbol.keyFor(symbol)).toBe(key);
  });

  it('should return the same symbol for a symbol', () => {
    const key = Symbol.for('test');
    const symbol = getSymbolFor(key);
    expect(symbol).toBe(key);
  });
});
