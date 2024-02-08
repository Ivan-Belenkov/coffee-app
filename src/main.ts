import 'src/main.less';
import 'reflect-metadata';
import App from 'src/App.svelte';
import serviceList from 'src/container/services';
import type { ISvelteService } from 'src/container/interfaces';
import { ContainerBuilder, get } from 'src/container/container';

new ContainerBuilder().build(serviceList);
const SvelteService = get<ISvelteService>('SvelteService');
export default SvelteService.create<typeof App>(document.body, App);
