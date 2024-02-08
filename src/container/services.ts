import type { ServiceType } from 'src/config/types';
import type { ServiceNames } from 'src/container/types';
import { StoreService } from 'src/services/StoreService';
import { SvelteService } from 'src/services/SvelteService';

const serviceList: ServiceType<ServiceNames> = {
  SvelteService: SvelteService,
  StoreService: StoreService
};

export default serviceList;
