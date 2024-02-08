import { enumKeysToArray } from 'src/utils/utils';

enum StringEnum {
  Value1 = 'Value 1',
  Value2 = 'Value 2',
  Value3 = 'Value 3'
}

enum NumericEnum {
  Value1,
  Value2,
  Value3
}

enum EmptyEnum {}

describe('enumKeysToArray', () => {
  it('should convert string enum keys to array', () => {
    const result = enumKeysToArray(StringEnum);
    expect(result).toEqual(['Value1', 'Value2', 'Value3']);
  });

  it('should convert number enum keys to array', () => {
    const result = enumKeysToArray(NumericEnum);
    expect(result).toEqual(['Value1', 'Value2', 'Value3']);
  });

  it('should return an empty array if input is empty enum', () => {
    const result = enumKeysToArray(EmptyEnum);
    expect(result).toEqual([]);
  });
});
