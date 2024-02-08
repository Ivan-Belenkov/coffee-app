import type { interfaces } from 'inversify';
import { getSymbolFor } from 'src/utils/utils';
import serviceContainer from './containerInstance';
import type { ServiceType } from 'src/config/types';
import { type ServiceNames, SERVICE_TYPES } from 'src/container/types';

export class ContainerBuilder<T extends string> {
  build(services: ServiceType<T>): interfaces.Container {
    Object.entries(services).forEach(([key, service]) => {
      const typeInstance = key as ServiceNames;
      serviceContainer
        .bind(getSymbolFor(typeInstance))
        .to(service as interfaces.Newable<unknown>)
        .inSingletonScope();
    });
    return serviceContainer;
  }
}

export function getContainer() {
  return serviceContainer;
}

export function get<T>(key: ServiceNames | symbol): T {
  return getContainer().get<T>(getSymbolFor(key));
}

export { SERVICE_TYPES, serviceContainer };
