import { injectable, inject } from "inversify";
import type { IGetUserListRepository } from "@/business/domain/repositories/user-list/get";
import type { IStorageService } from "@/business/domain/common/storage-service";
import type { IConfigService } from "@/business/domain/common/config-service";
import type { GetMovieDTO } from "@/business/domain/dtos/movie/get";
import { InfraTokens } from "@/libs/inversifyjs/tokens/infrastructure-tokens";
import { CodeMessagesEnum } from "@/business/domain/common/enums/code-messages";
import { handleResponseRepository } from "@/infrastructure/utils/handle-response-repository";
import type { IAPIResponse } from "@/business/domain/common/api-response";
import AppError from "@/business/tools/app-error";

@injectable()
export class GetUserListRepositoryImpl implements IGetUserListRepository {
  constructor(
    @inject(InfraTokens.IStorageService)
    private readonly storageService: IStorageService,
    @inject(InfraTokens.IConfigService)
    private readonly configService: IConfigService,
  ) {}

  async execute(): Promise<IAPIResponse<GetMovieDTO[]> | AppError> {
    return handleResponseRepository(
      async () => {
        const data = await this.storageService.getItem(this.configService.getUserListStorageKey());
        const dtos: GetMovieDTO[] = data ? JSON.parse(data) : [];
        return dtos;
      },
      CodeMessagesEnum.ERROR_GET_USER_LIST
    );
  }
}
