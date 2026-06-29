import { injectable } from "inversify";
import { IStorageService } from "data/protocols/IStorageService";

@injectable()
export class LocalStorageService implements IStorageService {
  public async getItem(key: string): Promise<string | null> {
    return window.localStorage.getItem(key);
  }

  public async setItem(key: string, value: string): Promise<void> {
    window.localStorage.setItem(key, value);
  }

  public async removeItem(key: string): Promise<void> {
    window.localStorage.removeItem(key);
  }
}
