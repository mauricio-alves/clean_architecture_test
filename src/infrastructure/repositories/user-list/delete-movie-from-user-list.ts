import { injectable, inject } from "inversify";
import type { IDeleteMovieFromUserListRepository } from "@/business/domain/repositories/user-list/delete";
import type { IStorageService } from "@/business/domain/common/storage-service";
import type { IConfigService } from "@/business/domain/common/config-service";
import type { GetMovieDTO } from "@/business/domain/dtos/movie/get";
import { InfraTokens } from "@/libs/inversifyjs/tokens/infrastructure-tokens";
import { CodeMessagesEnum } from "@/business/domain/common/enums/code-messages";
import { handleResponseRepository } from "@/infrastructure/utils/handle-response-repository";
import type { IAPIResponse } from "@/business/domain/common/api-response";
import AppError from "@/business/tools/app-error";

@injectable()
export class DeleteMovieFromUserListRepositoryImpl implements IDeleteMovieFromUserListRepository {
  constructor(
    @inject(InfraTokens.IStorageService)
    private readonly storageService: IStorageService,
    @inject(InfraTokens.IConfigService)
    private readonly configService: IConfigService,
  ) {}

  async execute(id: string): Promise<IAPIResponse<GetMovieDTO[]> | AppError> {
    return handleResponseRepository(
      async () => {
        const storageKey = this.configService.getUserListStorageKey();
        const data = await this.storageService.getItem(storageKey);
        const dtos: GetMovieDTO[] = data ? JSON.parse(data) : [];

        const updatedDtos = dtos.filter((m) => m.id !== Number(id));
        await this.storageService.setItem(storageKey, JSON.stringify(updatedDtos));

        return updatedDtos;
      },
      CodeMessagesEnum.ERROR_REMOVE_MOVIE_FROM_USER_LIST
    );
  }
}
