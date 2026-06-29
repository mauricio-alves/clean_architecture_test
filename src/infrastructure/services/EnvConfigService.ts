import { injectable } from "inversify";
import { IConfigService } from "data/protocols/IConfigService";

@injectable()
export class EnvConfigService implements IConfigService {
  private readonly apiKey: string;
  private readonly baseUrl: string = "https://api.themoviedb.org/3";
  private readonly baseImgUrl: string = "https://image.tmdb.org/t/p/w500";

  constructor() {
    const key = import.meta.env.VITE_API_KEY;
    if (!key) {
      throw new Error("VITE_API_KEY is not defined in environment variables");
    }
    this.apiKey = key;
  }

  public getApiKey(): string {
    return this.apiKey;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public getBaseImgUrl(): string {
    return this.baseImgUrl;
  }
}
