import { injectable } from 'inversify';
import type { SvelteComponent } from 'svelte';
import type { ISvelteService } from 'src/container/interfaces';

@injectable()
export class SvelteService implements ISvelteService {
  create<T>(selector: Element, component: T): SvelteComponent {
    return new (component as new (options: unknown) => SvelteComponent)({ target: selector });
  }
}
