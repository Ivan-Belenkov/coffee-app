import { injectable } from 'inversify';
import { IHttpService } from 'src/container/interfaces';

@injectable()
export class FakeHttpService implements IHttpService {
  get<T>(url: string): Promise<T> {
    return Promise.resolve({ url } as T);
  }
}

export const getMock = jest.spyOn(FakeHttpService.prototype, 'get');
