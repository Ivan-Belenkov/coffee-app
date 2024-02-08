import { HttpService } from 'src/services/HttpService';
import { Container } from 'inversify';

describe('HttpService', () => {
  let container: Container;
  let httpService: HttpService;

  beforeEach(() => {
    container = new Container();
    container.bind(HttpService).toSelf();
    httpService = container.get(HttpService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch data from URL', async () => {
    const fetchMock = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ data: 'mockedData' }) }));
    global.fetch = fetchMock;

    const result = await httpService.get<{ data: string }>('/some-url');

    expect(fetchMock).toHaveBeenCalledWith('/some-url');

    expect(result).toEqual({ data: 'mockedData' });
  });

  it('should throw an error if fetch fails', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false, status: 404 }));

    await expect(httpService.get('/nonexistent-url')).rejects.toThrow('HTTP error! Status: 404');
  });
});
