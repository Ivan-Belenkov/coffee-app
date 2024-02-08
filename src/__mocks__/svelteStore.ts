export const mockSet = jest.fn();
export const writableMock = jest.fn((value) => {
  const set = mockSet.mockImplementation((newValue) => {
    value = newValue;
  });
  const update = jest.fn((callback) => {
    set(callback(value));
  });
  return {
    set,
    update,
    subscribe: jest.fn()
  };
});

jest.mock('svelte/store', () => ({
  writable: writableMock
}));
