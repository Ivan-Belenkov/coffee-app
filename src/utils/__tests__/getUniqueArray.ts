import { getUniqueArray } from 'src/utils/utils';

describe('getUniqueArray function', () => {
  it('should return an array with unique elements', () => {
    const inputArray = [1, 2, 3, 3, 4, 5, 5];
    const expectedResult = [1, 2, 3, 4, 5];
    expect(getUniqueArray(inputArray)).toEqual(expectedResult);
  });

  it('should return an array with unique strings', () => {
    const inputArray = ['apple', 'banana', 'apple', 'orange', 'banana'];
    const expectedResult = ['apple', 'banana', 'orange'];
    expect(getUniqueArray(inputArray)).toEqual(expectedResult);
  });

  it('should return an empty array if input array is empty', () => {
    const inputArray: number[] = [];
    const expectedResult: number[] = [];
    expect(getUniqueArray(inputArray)).toEqual(expectedResult);
  });
});
