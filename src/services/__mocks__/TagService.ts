import { injectable } from 'inversify';
import { ITagService } from 'src/container/interfaces';
import { CoffeeTag } from 'src/store/types';

@injectable()
export class FakeTagService implements ITagService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(tagString: string): CoffeeTag[] {
    return [];
  }
}

export const createMock = jest.spyOn(FakeTagService.prototype, 'create');
