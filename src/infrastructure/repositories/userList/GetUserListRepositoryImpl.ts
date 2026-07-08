import { injectable, inject } from "inversify";
import { Movie } from "@/business/domain/models/movie/Movie";
import type { IGetUserListRepository } from "@/business/domain/repositories/userList/get";
import { MovieLocalDataSource } from "infrastructure/dataSources/local/MovieLocalDataSource";
import { MovieMapper } from "@/business/mappers/MovieMapper";
import { MovieTokens } from "libs/inversifyjs/tokens/movieTokens";
import { CodeMessagesEnum } from "@/business/domain/common/enums/code-messages";
import { handleResponseRepository } from "@/infrastructure/utils/handle-response-repository";
import type { IAPIResponse } from "@/business/domain/common/api-response";
import AppError from "@/business/tools/AppError";

@injectable()
export class GetUserListRepositoryImpl implements IGetUserListRepository {
  constructor(
    @inject(MovieTokens.IMovieLocalDataSource)
    private readonly localDataSource: MovieLocalDataSource,
  ) {}

  async execute(): Promise<IAPIResponse<Movie[]> | AppError> {
    return handleResponseRepository(
      async () => {
        const dtos = await this.localDataSource.getFavorites();
        return MovieMapper.toEntityList(dtos);
      },
      CodeMessagesEnum.ERROR_GET_USER_LIST
    );
  }
}
