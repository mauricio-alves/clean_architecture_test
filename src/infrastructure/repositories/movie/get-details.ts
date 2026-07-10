import { injectable, inject } from "inversify";
import type { IGetMovieDetailsRepository } from "@/business/domain/repositories/movie/get-details";
import type { IHttpClient } from "@/business/domain/common/http-client";
import type { IConfigService } from "@/business/domain/common/config-service";
import type { GetMovieDTO } from "@/business/domain/dtos/movie/get";
import { InfraTokens } from "@/libs/inversifyjs/tokens/infrastructure-tokens";
import { CodeMessagesEnum } from "@/business/domain/common/enums/code-messages";
import { BaseGetRepository } from "@/infrastructure/repositories/base/get";

@injectable()
export class GetMovieDetailsRepository extends BaseGetRepository<GetMovieDTO> implements IGetMovieDetailsRepository {
  constructor(
    @inject(InfraTokens.IHttpClient)
    private readonly httpClient: IHttpClient,
    @inject(InfraTokens.IConfigService)
    private readonly configService: IConfigService,
  ) {
    super();
  }

  protected getErrorCode(): CodeMessagesEnum {
    return CodeMessagesEnum.ERROR_GET_MOVIE_DETAILS;
  }

  protected async fetchData(id: string): Promise<GetMovieDTO> {
    const apiKey = this.configService.getApiKey();
    const baseUrl = this.configService.getBaseUrl();
    const language = this.configService.getLanguage();

    const response = await this.httpClient.get<GetMovieDTO>({
      url: `${baseUrl}/movie/${id}`,
      params: {
        api_key: apiKey,
        language,
      },
    });

    return response.body;
  }
}
