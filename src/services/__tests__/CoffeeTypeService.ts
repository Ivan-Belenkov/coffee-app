import { Container } from 'inversify';
import { CoffeeTypeService } from 'src/services/CoffeeTypeService';
import {
  FakeStoreService,
  getMock as getStoreMock,
  listStoreMockAddMock,
  listStoreMockLengthMock
} from 'src/services/__mocks__/StoreService';
import { FakeHttpService, getMock as getHttpMock } from 'src/services/__mocks__/HttpService';
import { SERVICE_TYPES } from 'src/container/types';
import { CoffeeType, STORE_TYPES } from 'src/store/types';
import { createMock, FakeTagService } from 'src/services/__mocks__/TagService';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
const data = {
  id: 0,
  uid: 'test',
  blend_name: 'test',
  origin: 'test',
  variety: 'test',
  intensifier: 'test',
  notes: 'test'
};

const result: CoffeeType = {
  id: data.id,
  uid: data.uid,
  origin: data.origin,
  variety: data.variety,
  intensifier: data.intensifier,
  blendName: data.blend_name,
  tags: [
    {
      id: 1,
      text: 'test',
      color: '#583e23'
    }
  ],
  imageUrl: `https://loremflickr.com/500/500/coffee_bean?lock=${data.uid}`
};

describe('CoffeeTypeService', () => {
  let container: Container;
  let coffeeTypeService: CoffeeTypeService;

  beforeEach(() => {
    getHttpMock.mockClear();
    container = new Container();
    container.bind(CoffeeTypeService).toSelf();
    container.bind(SERVICE_TYPES.StoreService).to(FakeStoreService);
    container.bind(SERVICE_TYPES.HttpService).to(FakeHttpService);
    container.bind(SERVICE_TYPES.TagService).to(FakeTagService);

    coffeeTypeService = container.get(CoffeeTypeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call loadAnother and startPolling', async () => {
    const loadAnotherSpy = jest.spyOn(coffeeTypeService as never, 'loadAnother');
    const startPollingSpy = jest.spyOn(coffeeTypeService as never, 'startPolling');

    await coffeeTypeService.load();

    expect(loadAnotherSpy).toHaveBeenCalled();
    expect(startPollingSpy).toHaveBeenCalled();
  });

  it('should correctly retrieve and transform data', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getHttpMock.mockImplementation((url) => Promise.resolve(data));
    createMock.mockImplementation(() => result.tags);
    await coffeeTypeService.load();

    expect(getHttpMock).toHaveBeenCalled();
    expect(listStoreMockAddMock).toHaveBeenCalledWith(result);
  });

  it('should not start polling in case of error', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getHttpMock.mockImplementation((url) => Promise.reject('test'));
    const startPollingSpy = jest.spyOn(coffeeTypeService as never, 'startPolling');

    await expect(coffeeTypeService.load()).rejects.toEqual('test');
    expect(startPollingSpy).not.toHaveBeenCalled();
  });

  it('should not load another item if storage is full', async () => {
    listStoreMockLengthMock.mockReturnValue(100);

    await coffeeTypeService.load();

    expect(getHttpMock).not.toHaveBeenCalled();
  });

  it('should stop polling as storage is full', async () => {
    const loadAnotherSpy = jest.spyOn(coffeeTypeService as never, 'loadAnother');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getHttpMock.mockImplementation((url) => Promise.resolve(data));
    listStoreMockLengthMock.mockReturnValue(98);
    await coffeeTypeService.load();
    listStoreMockLengthMock.mockReturnValue(99);
    jest.runAllTimers();
    await Promise.resolve();
    listStoreMockLengthMock.mockReturnValue(100);
    jest.runAllTimers();
    expect(loadAnotherSpy).toHaveBeenCalledTimes(2);
  });

  it('should correctly retrieve CoffeeTypeList and LoadingState from StoreService', () => {
    coffeeTypeService.getList();
    coffeeTypeService.getLoadingState();
    expect(getStoreMock).toHaveBeenCalledTimes(2);
    expect(getStoreMock.mock.calls[0][0]).toBe(STORE_TYPES.CoffeeTypeList);
    expect(getStoreMock.mock.calls[1][0]).toBe(STORE_TYPES.LoadingState);
  });

  it('should clear the timer if it exists', () => {
    jest.spyOn(global, 'clearTimeout');
    const timer = setTimeout(() => {}, 1000);
    coffeeTypeService['timer'] = timer;

    coffeeTypeService.stopPolling();

    expect(clearTimeout).toHaveBeenCalledWith(timer);
  });
});
