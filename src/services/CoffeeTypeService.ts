import type { ICoffeeTypeService, IHttpService, IStoreService } from 'src/container/interfaces';
import { inject, injectable } from 'inversify';
import { SERVICE_TYPES } from 'src/container/container';
import { type CoffeeTag, type CoffeeType, type LoadingState, STORE_TYPES } from 'src/store/types';
import type { KeyValueStore } from 'src/store/KeyValueStore';
import type { ListStore } from 'src/store/ListStore';

type RawCoffeeType = {
  id: number;
  uid: string;
  blend_name?: string;
  origin: string;
  variety: string;
  intensifier: string;
  notes?: string;
};

const INTERVAL = 30_000;
export const MAX_COUNT = 100;

@injectable()
export class CoffeeTypeService implements ICoffeeTypeService {
  private timer!: ReturnType<typeof setTimeout>;
  protected httpService: IHttpService;
  protected storeService: IStoreService;
  constructor(
    @inject(SERVICE_TYPES.HttpService) httpService: IHttpService,
    @inject(SERVICE_TYPES.StoreService) storeService: IStoreService
  ) {
    this.httpService = httpService;
    this.storeService = storeService;
  }

  async load() {
    this.stopPolling();
    await this.loadAnother();
    this.startPolling();
  }

  stopPolling() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  getLoadingState(): KeyValueStore<LoadingState> {
    return this.storeService.get(STORE_TYPES.LoadingState) as KeyValueStore<LoadingState>;
  }

  getList(): ListStore<CoffeeType> {
    return this.storeService.get(STORE_TYPES.CoffeeTypeList) as unknown as ListStore<CoffeeType>;
  }

  private transformData(raw: RawCoffeeType): CoffeeType {
    const blendName = raw.blend_name ?? '';
    const tags: CoffeeTag[] = (raw.notes ? raw.notes.split(',') : []).map(
      (item, index): CoffeeTag => ({
        id: index + 1,
        text: item,
        color: '#583e23'
      })
    );
    const copy = { ...raw };
    delete copy.blend_name;
    delete copy.notes;
    return {
      ...copy,
      blendName,
      tags,
      imageUrl: 'https://loremflickr.com/500/500/coffee_bean?lock=' + copy.uid
    };
  }

  private async loadAnother() {
    const loadingState = this.getLoadingState();
    const list = this.getList();
    if (this.getList().length() >= MAX_COUNT) {
      this.stopPolling();
      return;
    }
    try {
      loadingState.updateValue({
        loading: true,
        error: false
      });
      const raw = await this.httpService.get<RawCoffeeType>('https://random-data-api.com/api/coffee/random_coffee');
      list.add(this.transformData(raw));
      loadingState.updateValue('loading', false);
    } catch (e) {
      loadingState.updateValue({
        loading: false,
        error: true
      });
      throw e;
    }
  }

  private startPolling() {
    this.stopPolling();
    this.timer = setTimeout(async () => {
      try {
        await this.loadAnother();
      } catch {
        /* empty */
      } finally {
        this.startPolling();
      }
    }, INTERVAL);
  }
}
