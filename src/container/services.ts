import type { ServiceType } from 'src/config/types';
import { HttpService } from 'src/services/HttpService';
import type { ServiceNames } from 'src/container/types';
import { StoreService } from 'src/services/StoreService';
import { SvelteService } from 'src/services/SvelteService';

const serviceList: ServiceType<ServiceNames> = {
  SvelteService: SvelteService,
  StoreService: StoreService,
  HttpService: HttpService
};

export default serviceList;
