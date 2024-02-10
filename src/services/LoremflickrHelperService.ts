import type { ILoremflickrHelperService } from 'src/container/interfaces';
import { injectable } from 'inversify';

@injectable()
export class LoremflickrHelperService implements ILoremflickrHelperService {
  async loadUrl(url: string): Promise<string> {
    const response = await fetch(url);
    if (response.ok && response.redirected) {
      return response.url;
    }
    throw new Error("Can't get an image url");
  }
}
