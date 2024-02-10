import { injectable } from 'inversify';
import { ILoremflickrHelperService } from 'src/container/interfaces';

@injectable()
export class FakeLoremflickrHelperService implements ILoremflickrHelperService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadUrl(url: string): Promise<string> {
    return Promise.resolve('');
  }
}

export const loadUrlMock = jest.spyOn(FakeLoremflickrHelperService.prototype, 'loadUrl');
