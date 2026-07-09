import { injectable, inject } from "inversify";
import { Movie } from "@/business/domain/models/movie/movie";
import type { IDeleteMovieFromUserListRepository } from "@/business/domain/repositories/user-list/delete";
import type { IStorageService } from "@/business/domain/common/storage-service";
import type { GetMovieDTO } from "@/business/domain/dtos/movie/get";
import { InfraTokens } from "libs/inversifyjs/tokens/infrastructure-tokens";
import { MovieMapper } from "@/business/mappers/movie-mapper";
import { CodeMessagesEnum } from "@/business/domain/common/enums/code-messages";
import { handleResponseRepository } from "@/infrastructure/utils/handle-response-repository";
import type { IAPIResponse } from "@/business/domain/common/api-response";
import AppError from "@/business/tools/app-error";

@injectable()
export class DeleteMovieFromUserListRepositoryImpl implements IDeleteMovieFromUserListRepository {
  private readonly storageKey = "@movie-app:favorites";

  constructor(
    @inject(InfraTokens.IStorageService)
    private readonly storageService: IStorageService,
  ) {}

  async execute(id: string): Promise<IAPIResponse<Movie[]> | AppError> {
    return handleResponseRepository(
      async () => {
        const data = await this.storageService.getItem(this.storageKey);
        const dtos: GetMovieDTO[] = data ? JSON.parse(data) : [];
        
        const updatedDtos = dtos.filter((m) => m.id !== Number(id));
        await this.storageService.setItem(this.storageKey, JSON.stringify(updatedDtos));
        
        return MovieMapper.toEntityList(updatedDtos);
      },
      CodeMessagesEnum.ERROR_REMOVE_MOVIE_FROM_USER_LIST
    );
  }
}
