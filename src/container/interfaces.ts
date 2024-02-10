import type { Readable } from 'svelte/store';
import type { SvelteComponent } from 'svelte';
import type { CoffeeTag, CoffeeType, LoadingState, StoreData } from 'src/store/types';

export interface ISvelteService {
  create<T>(selector: Element, component: T): SvelteComponent;
}

export interface IStoreService {
  createListStore<T extends StoreData>(key: string | symbol, initialData: T[]): Readable<T[]>;
  createKeyValueStore<T extends StoreData>(key: string | symbol, initialData: T): Readable<T>;
  get(key: string | symbol): Readable<StoreData> | undefined;
}

export interface IHttpService {
  get<T>(url: string): Promise<T>;
}

export interface ICoffeeTypeService {
  load(): Promise<void>;
  stopPolling(): void;
  getLoadingState(): Readable<LoadingState>;
  getList(): Readable<CoffeeType[]>;
}

export interface ITagService {
  create(tagString: string): CoffeeTag[];
}

export interface ILoremflickrHelperService {
  loadUrl(url: string): Promise<string>;
}

export interface IImgLoaderService {
  load(url: string, fromLF?: boolean): Promise<HTMLImageElement>;
}
