import { injectable } from 'inversify';
import { IStoreService } from 'src/container/interfaces';
import { STORE_TYPES, StoreData } from 'src/store/types';
import { Readable } from 'svelte/store';

@injectable()
export class FakeStoreService implements IStoreService {
  createListStore<T extends StoreData>(key: string | symbol, initialData: T[]): Readable<T[]> {
    return { key, initialData } as unknown as Readable<T[]>;
  }

  createKeyValueStore<T extends StoreData>(key: string | symbol, initialData: T): Readable<T> {
    return { key, initialData } as unknown as Readable<T>;
  }

  get(key: string | symbol): Readable<StoreData> | undefined {
    return { key } as unknown as Readable<StoreData>;
  }
}

export const listStoreMockAddMock = jest.fn();
export const listStoreMockLengthMock = jest.fn(() => 0);

export const keyValueStoreMockUpdateValueMock = jest.fn();

const listStoreMockImplementation = {
  subscribe: jest.fn(),
  add: listStoreMockAddMock,
  length: listStoreMockLengthMock
};
const keyValueStoreMockImplementation = {
  subscribe: jest.fn(),
  updateValue: keyValueStoreMockUpdateValueMock
};
export const createListStoreMock = jest
  .spyOn(FakeStoreService.prototype, 'createListStore')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .mockImplementation((key) => listStoreMockImplementation);
export const createKeyValueStoreMock = jest
  .spyOn(FakeStoreService.prototype, 'createKeyValueStore')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .mockImplementation((key) => keyValueStoreMockImplementation);
export const getMock = jest
  .spyOn(FakeStoreService.prototype, 'get')
  .mockImplementation((key) =>
    key === STORE_TYPES.CoffeeTypeList ? listStoreMockImplementation : keyValueStoreMockImplementation
  );
