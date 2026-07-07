import { injectable, inject } from "inversify";
import type { IHttpClient } from "data/protocols/HttpClient";
import type { IConfigService } from "data/protocols/ConfigService";
import { MovieDTO } from "data/dtos/MovieDTO";
import { TOKENS } from "libs/inversifyjs/tokens";

@injectable()
export class MovieRemoteDataSource {
  constructor(
    @inject(TOKENS.IHttpClient)
    private readonly httpClient: IHttpClient,
    @inject(TOKENS.IConfigService)
    private readonly configService: IConfigService,
  ) {}

  async getMoviesByCategory(category: string): Promise<MovieDTO[]> {
    const apiKey = this.configService.getApiKey();
    const baseUrl = this.configService.getBaseUrl();
    const language = this.configService.getLanguage();
    const response = await this.httpClient.get<{ results: MovieDTO[] }>({
      url: `${baseUrl}/movie/${category}`,
      params: {
        api_key: apiKey,
        language,
        page: 1,
      },
    });
    return response.body.results;
  }

  async getMovieDetails(id: string): Promise<MovieDTO> {
    const apiKey = this.configService.getApiKey();
    const baseUrl = this.configService.getBaseUrl();
    const language = this.configService.getLanguage();
    const response = await this.httpClient.get<MovieDTO>({
      url: `${baseUrl}/movie/${id}`,
      params: {
        api_key: apiKey,
        language,
      },
    });
    return response.body;
  }
}
