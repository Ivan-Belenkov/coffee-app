import { Store } from 'src/store/Store';

export class ListStore<T> extends Store<T[]> {
  private collectionLength!: number;
  constructor(data: T[]) {
    super(data);
    this.collectionLength = data.length;
  }

  add(item: T) {
    this.update((list) => {
      this.collectionLength++;
      return [...list, item];
    });
  }

  length() {
    return this.collectionLength;
  }
}
