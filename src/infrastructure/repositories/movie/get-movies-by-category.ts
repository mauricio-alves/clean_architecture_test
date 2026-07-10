import { injectable, inject } from "inversify";
import type { IGetMoviesByCategoryRepository } from "@/business/domain/repositories/movie/get-by-category";
import type { IHttpClient } from "@/business/domain/common/http-client";
import type { IConfigService } from "@/business/domain/common/config-service";
import type { GetMovieDTO } from "@/business/domain/dtos/movie/get";
import { InfraTokens } from "@/libs/inversifyjs/tokens/infrastructure-tokens";
import { CodeMessagesEnum } from "@/business/domain/common/enums/code-messages";
import { BaseGetByCategoryRepository } from "@/infrastructure/repositories/base/get-by-category";

@injectable()
export class GetMoviesByCategoryRepositoryImpl extends BaseGetByCategoryRepository<GetMovieDTO> implements IGetMoviesByCategoryRepository {
  constructor(
    @inject(InfraTokens.IHttpClient)
    private readonly httpClient: IHttpClient,
    @inject(InfraTokens.IConfigService)
    private readonly configService: IConfigService,
  ) {
    super();
  }

  protected getErrorCode(): CodeMessagesEnum {
    return CodeMessagesEnum.ERROR_GET_MOVIES_BY_CATEGORY;
  }

  protected async fetchData(category: string): Promise<GetMovieDTO[]> {
    const apiKey = this.configService.getApiKey();
    const baseUrl = this.configService.getBaseUrl();
    const language = this.configService.getLanguage();

    const response = await this.httpClient.get<{ results: GetMovieDTO[] }>({
      url: `${baseUrl}/movie/${category}`,
      params: {
        api_key: apiKey,
        language,
        page: 1,
      },
    });

    return response.body.results;
  }
}
