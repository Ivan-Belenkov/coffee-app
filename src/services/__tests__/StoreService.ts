import { StoreService } from 'src/services/StoreService';
import { KeyValueStore } from 'src/store/KeyValueStore';
import { ListStore } from 'src/store/ListStore';
import { Container } from 'inversify';

jest.mock('src/store/KeyValueStore', () => ({
  KeyValueStore: jest.fn()
}));
jest.mock('src/store/ListStore', () => ({
  ListStore: jest.fn()
}));

describe('StoreService', () => {
  let container: Container;
  let storeService: StoreService;

  beforeEach(() => {
    container = new Container();
    container.bind(StoreService).toSelf();
    storeService = container.get(StoreService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a KeyValueStore', () => {
    const key = 'key';
    const initialData = { loading: true, error: false };
    const store = storeService.createKeyValueStore(key, initialData);

    expect(KeyValueStore).toHaveBeenCalledWith(initialData);
    expect(storeService.get(key)).toBe(store);
  });

  it('should create a KeyValueStore without initial data', () => {
    const key = 'key';
    const store = storeService.createKeyValueStore(key);

    expect(KeyValueStore).toHaveBeenCalledWith({});
    expect(storeService.get(key)).toBe(store);
  });

  it('should create a ListStore', () => {
    const key = 'key';
    const initialData = ['a', 'b', 'c'];
    const store = storeService.createListStore(key, initialData);

    expect(ListStore).toHaveBeenCalledWith(initialData);
    expect(storeService.get(key)).toBe(store);
  });

  it('should return undefined for non-existent store', () => {
    const key = 'non-existent-key';
    const store = storeService.get(key);

    expect(store).toBeUndefined();
  });
});
