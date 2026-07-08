import { injectable, inject } from "inversify";
import type { IHttpClient } from "infrastructure/protocols/HttpClient";
import type { IConfigService } from "infrastructure/protocols/ConfigService";
import { MovieDTO } from "business/domain/models/MovieDTO";
import { MovieTokens } from "libs/inversifyjs/tokens/movieTokens"; import { UserListTokens } from "libs/inversifyjs/tokens/userListTokens"; import { InfraTokens } from "libs/inversifyjs/tokens/infrastructureTokens";

@injectable()
export class MovieRemoteDataSource {
  constructor(
    @inject(InfraTokens.IHttpClient)
    private readonly httpClient: IHttpClient,
    @inject(InfraTokens.IConfigService)
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

