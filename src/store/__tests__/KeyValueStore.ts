import { writableMock as writable, mockSet } from 'src/__mocks__/svelteStore';
import { KeyValueStore } from 'src/store/KeyValueStore';

describe('KeyValueStore', () => {
  beforeEach(() => {
    (writable as jest.Mock).mockClear();
  });
  it('should update single value', () => {
    const record = { name: 'John', age: 30 };
    const store = new KeyValueStore(record);

    store.updateValue('name', 'Alice');

    expect(mockSet).toHaveBeenCalledWith({ ...record, name: 'Alice' });
  });

  it('should update single value with object syntax', () => {
    const record = { name: 'John', age: 30 };
    const newRecord = { name: 'Alice' };
    const store = new KeyValueStore(record);

    store.updateValue(newRecord);

    expect(mockSet).toHaveBeenCalledWith({ ...record, ...newRecord });
  });

  it('should update multiple values', () => {
    const record = { name: 'John', age: 30 };
    const newRecord = { name: 'Alice', age: 25 };
    const store = new KeyValueStore(record);

    store.updateValue(newRecord);

    expect(mockSet).toHaveBeenCalledWith(newRecord);
  });
});
