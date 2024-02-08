import { Store } from 'src/store/Store';

export class KeyValueStore<T extends Record<PropertyKey, unknown>> extends Store<T> {
  constructor(record: T) {
    super(record);
  }

  updateValue(key: Partial<T>): void;
  updateValue(key: keyof T, value: T[keyof T]): void;
  updateValue(key: Partial<T> | keyof T, value?: T[keyof T]) {
    this.update((record) => ({
      ...record,
      ...(typeof key === 'object' ? key : { [key]: value })
    }));
  }
}
