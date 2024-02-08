import type { IHttpService } from '../container/interfaces';
import { injectable } from 'inversify';

@injectable()
export class HttpService implements IHttpService {
  async get<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}
