import { writableMock as writable, mockSet } from 'src/__mocks__/svelteStore';
import { ListStore } from 'src/store/ListStore';

describe('ListStore', () => {
  beforeEach(() => {
    (writable as jest.Mock).mockClear();
  });
  it('should initialize with given data', () => {
    const data = ['a', 'b', 'c'];
    const store = new ListStore(data);

    expect(store.length()).toBe(data.length);
  });

  it('should add items correctly', () => {
    const data = ['a', 'b', 'c'];
    const store = new ListStore(data);

    expect(store.length()).toBe(data.length);

    store.add('d');
    expect(mockSet).toHaveBeenCalledWith([...data, 'd']);
    expect(store.length()).toBe(data.length + 1);

    store.add('e');
    expect(mockSet).toHaveBeenCalledWith([...data, 'd', 'e']);
    expect(store.length()).toBe(data.length + 2);
  });
});
