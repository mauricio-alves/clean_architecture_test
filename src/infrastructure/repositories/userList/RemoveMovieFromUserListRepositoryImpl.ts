import { injectable, inject } from "inversify";
import { Movie } from "@/business/domain/models/movie/Movie";
import type { IRemoveMovieFromUserListRepository } from "@/business/domain/repositories/userList/remove";
import { MovieLocalDataSource } from "infrastructure/dataSources/local/MovieLocalDataSource";
import { MovieMapper } from "@/business/mappers/MovieMapper";
import { MovieTokens } from "libs/inversifyjs/tokens/movieTokens";
import { CodeMessagesEnum } from "@/business/domain/common/enums/code-messages";
import { handleResponseRepository } from "@/infrastructure/utils/handle-response-repository";
import type { IAPIResponse } from "@/business/domain/common/api-response";
import AppError from "@/business/tools/AppError";

@injectable()
export class RemoveMovieFromUserListRepositoryImpl implements IRemoveMovieFromUserListRepository {
  constructor(
    @inject(MovieTokens.IMovieLocalDataSource)
    private readonly localDataSource: MovieLocalDataSource,
  ) {}

  async execute(id: string): Promise<IAPIResponse<Movie[]> | AppError> {
    return handleResponseRepository(
      async () => {
        const dtos = await this.localDataSource.getFavorites();
        const updatedDtos = dtos.filter((m) => m.id !== Number(id));
        await this.localDataSource.saveFavorites(updatedDtos);
        
        return MovieMapper.toEntityList(updatedDtos);
      },
      CodeMessagesEnum.ERROR_REMOVE_MOVIE_FROM_USER_LIST
    );
  }
}

