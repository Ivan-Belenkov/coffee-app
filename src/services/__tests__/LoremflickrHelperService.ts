import { LoremflickrHelperService } from 'src/services/LoremflickrHelperService';
import { Container } from 'inversify';

describe('LoremflickrHelperService', () => {
  let container: Container;
  let loremflickrHelperService: LoremflickrHelperService;

  beforeEach(() => {
    container = new Container();
    container.bind(LoremflickrHelperService).toSelf();
    loremflickrHelperService = container.get(LoremflickrHelperService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve with image URL if response is ok and redirected', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      redirected: true,
      url: 'https://example.com/image.jpg'
    } as never);

    const url = await loremflickrHelperService.loadUrl('https://example.com');

    expect(url).toBe('https://example.com/image.jpg');
    expect(fetchMock).toHaveBeenCalledWith('https://example.com');
    fetchMock.mockRestore();
  });

  it('should reject if response is not ok', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      redirected: true
    } as never);

    await expect(loremflickrHelperService.loadUrl('https://example.com')).rejects.toThrow("Can't get an image url");
  });

  it('should reject if response is not redirected', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      redirected: false
    } as never);

    await expect(loremflickrHelperService.loadUrl('https://example.com')).rejects.toThrow("Can't get an image url");
  });
});
