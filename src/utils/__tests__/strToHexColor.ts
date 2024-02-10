import { strToHexColor } from 'src/utils/utils';

describe('strToHexColor', () => {
  it('should return hex color string', () => {
    expect(strToHexColor('hello')).toEqual('#E918D2');
    expect(strToHexColor('world')).toEqual('#C11B92');
    expect(strToHexColor('jest')).toEqual('#31B8DC');
  });

  it('should return the same color for the same input string', () => {
    const color1 = strToHexColor('hello');
    const color2 = strToHexColor('hello');
    expect(color1).toEqual(color2);
  });
});
