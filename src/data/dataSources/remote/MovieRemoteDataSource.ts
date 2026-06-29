import { injectable, inject } from "inversify";
import type { IHttpClient } from "data/protocols/IHttpClient";
import type { IConfigService } from "data/protocols/IConfigService";
import { MovieDTO } from "data/dtos/MovieDTO";
import { TOKENS } from "libs/inversifyjs/tokens";

@injectable()
export class MovieRemoteDataSource {
  constructor(
    @inject(TOKENS.IHttpClient)
    private readonly httpClient: IHttpClient,
    @inject(TOKENS.IConfigService)
    private readonly configService: IConfigService
  ) {}

  async getMoviesByCategory(category: string): Promise<MovieDTO[]> {
    const apiKey = this.configService.getApiKey();
    const baseUrl = this.configService.getBaseUrl();
    const response = await this.httpClient.get<{ results: MovieDTO[] }>(
      `${baseUrl}/movie/${category}`,
      {
        params: {
          api_key: apiKey,
          language: "pt-BR",
          page: 1
        }
      }
    );
    return response.results;
  }

  async getMovieDetails(id: string): Promise<MovieDTO> {
    const apiKey = this.configService.getApiKey();
    const baseUrl = this.configService.getBaseUrl();
    return this.httpClient.get<MovieDTO>(
      `${baseUrl}/movie/${id}`,
      {
        params: {
          api_key: apiKey,
          language: "pt-BR"
        }
      }
    );
  }
}
