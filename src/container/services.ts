import type { ServiceType } from 'src/config/types';
import type { ServiceNames } from 'src/container/types';
import { SvelteService } from 'src/services/SvelteService';

const serviceList: ServiceType<ServiceNames> = {
  SvelteService: SvelteService
};

export default serviceList;
