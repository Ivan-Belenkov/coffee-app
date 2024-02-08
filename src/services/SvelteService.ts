import type { SvelteComponent } from 'svelte';
import { inject, injectable } from 'inversify';
import { SERVICE_TYPES } from 'src/container/container';
import { type CoffeeType, STORE_TYPES } from 'src/store/types';
import type { IStoreService, ISvelteService } from 'src/container/interfaces';

@injectable()
export class SvelteService implements ISvelteService {
  protected storeService: IStoreService;
  constructor(@inject(SERVICE_TYPES.StoreService) storeService: IStoreService) {
    this.storeService = storeService;
  }

  create<T>(selector: Element, component: T): SvelteComponent {
    this.storeService.createKeyValueStore(STORE_TYPES.LoadingState, {
      loading: false,
      error: false
    });
    this.storeService.createListStore<CoffeeType>(STORE_TYPES.CoffeeTypeList, []);
    return new (component as new (options: unknown) => SvelteComponent)({ target: selector });
  }
}
