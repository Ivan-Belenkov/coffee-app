import { Container } from 'inversify';
import { ImgLoaderService } from 'src/services/ImgLoaderService';
import { FakeLoremflickrHelperService, loadUrlMock } from 'src/services/__mocks__/LoremflickrHelperService';
import { SERVICE_TYPES } from 'src/container/types';

describe('ImgLoaderService', () => {
  let container: Container;
  let imgLoaderService: ImgLoaderService;

  beforeEach(() => {
    container = new Container();
    container.bind(ImgLoaderService).toSelf();
    container.bind(SERVICE_TYPES.LoremflickrHelperService).to(FakeLoremflickrHelperService);

    imgLoaderService = container.get(ImgLoaderService);
  });

  it('should resolve with image element if URL is provided directly', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let img: any;
    const url = 'https://example.com/image.jpg';
    global.Image = jest.fn().mockImplementation(() => {
      img = {
        src: url
      };
      return img;
    });

    const promise = imgLoaderService.load(url);
    img.onload?.();
    const imgElement = await promise;
    expect(imgElement.src).toBe(url);
  });

  it('should resolve with image element if URL is loaded with loremflickrHelper', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let img: any;
    const url = 'https://example.com/image.jpg';
    const resolvedUrl = 'https://example.com/resolved.jpg';
    global.Image = jest.fn().mockImplementation(() => {
      img = {
        src: resolvedUrl
      };
      return img;
    });

    loadUrlMock.mockResolvedValueOnce(resolvedUrl);

    const imgElementPromise = imgLoaderService.load(url, true);

    expect(loadUrlMock).toHaveBeenCalledWith(url);
    img.onload?.();

    const imgElement = await imgElementPromise;

    expect((imgElement as { src: string }).src).toBe(resolvedUrl);
  });

  it('should reject if loading image directly fails', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let img: any;
    const url = 'https://example.com/image.jpg';
    global.Image = jest.fn().mockImplementation(() => {
      img = {
        src: url
      };
      return img;
    });

    const promise = imgLoaderService.load(url);
    img.onerror(new Error('Failed to load image'));
    await expect(promise).rejects.toThrow('Failed to load image');
  });

  it('should reject if loading image with loremflickrHelper fails', async () => {
    const url = 'https://example.com/image.jpg';

    loadUrlMock.mockRejectedValueOnce(new Error('Failed to load image'));

    await expect(imgLoaderService.load(url, true)).rejects.toThrow('Failed to load image');
  });
});
