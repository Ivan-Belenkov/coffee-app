import { type Readable, writable } from 'svelte/store';

export class Store<T> implements Readable<T> {
  public subscribe;
  protected readonly update;

  constructor(data: T) {
    const { subscribe, update } = writable<T>(data);

    this.subscribe = subscribe;
    this.update = update;
  }
}
