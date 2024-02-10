import { Container } from 'inversify';
import { TagService } from 'src/services/TagService';
import { getUniqueArray, strToHexColor } from 'src/utils/utils';

jest.mock('src/utils/utils', () => ({
  strToHexColor: jest.fn(() => '#ffffff'),
  getUniqueArray: jest.fn(() => [])
}));
describe('TagService', () => {
  let container: Container;
  let tagService: TagService;

  beforeEach(() => {
    container = new Container();
    container.bind(TagService).toSelf();
    tagService = container.get(TagService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create empty array if tagString is empty', () => {
    expect(tagService.create('')).toEqual([]);
  });

  it('should generate correct tags', () => {
    const tagString = 'tag';
    (getUniqueArray as jest.Mock).mockReturnValue([tagString]);
    tagService.create(tagString);

    expect(tagService['tags'].get(tagString)).toEqual({
      id: 1,
      text: tagString,
      color: '#ffffff'
    });
  });

  it('should create unique tags', () => {
    const tagString = 'tag';
    (getUniqueArray as jest.Mock).mockReturnValue([tagString]);
    const tag = {
      id: 1,
      text: tagString,
      color: '#ffffff'
    };
    tagService['tags'].set(tagString, tag);

    tagService.create(tagString);

    expect(tagService['tags'].get(tagString)).toBe(tag);
  });
});
