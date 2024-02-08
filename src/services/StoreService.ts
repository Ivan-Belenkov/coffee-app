import { injectable } from 'inversify';
import type { Readable } from 'svelte/store';
import { getSymbolFor } from 'src/utils/utils';
import { ListStore } from 'src/store/ListStore';
import type { StoreData } from 'src/store/types';
import { KeyValueStore } from 'src/store/KeyValueStore';
import type { IStoreService } from 'src/container/interfaces';

@injectable()
export class StoreService implements IStoreService {
  private readonly cache = new Map<symbol, Readable<StoreData>>();

  private createStore<T>(
    constructor: new (initialData: T) => Readable<T>,
    key: string | symbol,
    initialData: T
  ): Readable<T> {
    key = getSymbolFor(key);
    if (!this.cache.has(key)) {
      this.cache.set(key, new constructor(initialData) as Readable<StoreData>);
    }
    return this.cache.get(key) as Readable<T>;
  }

  createKeyValueStore<T extends StoreData>(key: string | symbol, initialData: T = {} as T): Readable<T> {
    return this.createStore(KeyValueStore, key, initialData);
  }

  createListStore<T>(key: string | symbol, initialData: T[]): Readable<T[]> {
    return this.createStore<T[]>(ListStore, key, initialData);
  }

  get(key: string | symbol): Readable<StoreData> | undefined {
    return this.cache.get(getSymbolFor(key));
  }
}
