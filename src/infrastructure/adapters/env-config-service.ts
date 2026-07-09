import { injectable } from "inversify";
import { IConfigService } from "business/domain/common/config-service";

@injectable()
export class EnvConfigService implements IConfigService {
  private readonly apiKey: string;
  private readonly baseUrl: string = "https://api.themoviedb.org/3";
  private readonly baseImgUrl: string = "https://image.tmdb.org/t/p/w500";
  private readonly backdropImgUrl: string = "https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces";
  private readonly language: string;

  constructor() {
    const key = import.meta.env.VITE_API_KEY;
    if (!key) {
      throw new Error("VITE_API_KEY is not defined in environment variables");
    }
    this.apiKey = key;
    this.language = import.meta.env.VITE_LANGUAGE || "pt-BR";
  }

  getApiKey(): string {
    return this.apiKey;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getBaseImgUrl(): string {
    return this.baseImgUrl;
  }

  getBackdropImgUrl(): string {
    return this.backdropImgUrl;
  }

  getLanguage(): string {
    return this.language;
  }
}
