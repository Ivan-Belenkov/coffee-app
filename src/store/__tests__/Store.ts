import { writableMock as writable } from 'src/__mocks__/svelteStore';
import { Store } from 'src/store/Store';

describe('Store', () => {
  beforeEach(() => {
    (writable as jest.Mock).mockClear();
  });

  it('should return the initial value', () => {
    const initialValue = 'initial value';
    new Store(initialValue);

    expect(writable).toHaveBeenCalledWith(initialValue);
  });
});
