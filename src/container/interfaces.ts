import type { SvelteComponent } from 'svelte';

export interface ISvelteService {
  create<T>(selector: Element, component: T): SvelteComponent;
}
