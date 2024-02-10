import type { ServiceType } from 'src/config/types';
import { TagService } from 'src/services/TagService';
import { HttpService } from 'src/services/HttpService';
import type { ServiceNames } from 'src/container/types';
import { StoreService } from 'src/services/StoreService';
import { SvelteService } from 'src/services/SvelteService';
import { ImgLoaderService } from 'src/services/ImgLoaderService';
import { CoffeeTypeService } from 'src/services/CoffeeTypeService';
import { LoremflickrHelperService } from 'src/services/LoremflickrHelperService';

const serviceList: ServiceType<ServiceNames> = {
  SvelteService: SvelteService,
  StoreService: StoreService,
  HttpService: HttpService,
  CoffeeTypeService: CoffeeTypeService,
  TagService: TagService,
  LoremflickrHelperService: LoremflickrHelperService,
  ImgLoaderService: ImgLoaderService
};

export default serviceList;
