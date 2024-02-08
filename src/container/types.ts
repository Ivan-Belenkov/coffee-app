import { enumKeysToArray, getSymbolFor } from 'src/utils/utils';

enum SERVICE_NAMES {
  SvelteService,
  StoreService,
  HttpService,
  CoffeeTypeService
}

export type ServiceNames = keyof typeof SERVICE_NAMES;

function makeServiceTypes<T extends string>(serviceNames: T[]): Record<T, symbol> {
  return serviceNames.reduce((acc, item) => ({ ...acc, [item]: getSymbolFor(item) }), {} as Record<T, symbol>);
}

const SERVICE_TYPES = makeServiceTypes<ServiceNames>(enumKeysToArray<ServiceNames>(SERVICE_NAMES));

export { SERVICE_TYPES };
