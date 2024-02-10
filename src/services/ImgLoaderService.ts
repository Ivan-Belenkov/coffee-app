import { inject, injectable } from 'inversify';
import { SERVICE_TYPES } from 'src/container/container';
import type { IImgLoaderService, ILoremflickrHelperService } from 'src/container/interfaces';

@injectable()
export class ImgLoaderService implements IImgLoaderService {
  protected loremflickrHelper: ILoremflickrHelperService;

  constructor(@inject(SERVICE_TYPES.LoremflickrHelperService) loremflickrHelper: ILoremflickrHelperService) {
    this.loremflickrHelper = loremflickrHelper;
  }
  async load(url: string, fromLF = false): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve(img);
      };
      img.onerror = (error) => {
        reject(error);
      };
      if (fromLF) {
        this.loremflickrHelper.loadUrl(url).then((url) => (img.src = url), reject);
      } else {
        img.src = url;
      }
    });
  }
}
