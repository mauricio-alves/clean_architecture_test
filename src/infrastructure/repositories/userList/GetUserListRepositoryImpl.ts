import { injectable, inject } from "inversify";
import { Movie } from "business/domain/models/Movie";
import type { IGetUserListRepository } from "business/domain/repositories/userList/GetUserListRepository";
import { MovieLocalDataSource } from "infrastructure/dataSources/local/MovieLocalDataSource";
import { MovieMapper } from "business/mappers/MovieMapper";
import { MovieTokens } from "libs/inversifyjs/tokens/movieTokens"; import { UserListTokens } from "libs/inversifyjs/tokens/userListTokens"; import { InfraTokens } from "libs/inversifyjs/tokens/infrastructureTokens";
import AppError from "business/domain/errors/AppError";
import { MessageCode } from "business/domain/common/MessageCodes";

@injectable()
export class GetUserListRepositoryImpl implements IGetUserListRepository {
  constructor(
    @inject(MovieTokens.IMovieLocalDataSource)
    private readonly localDataSource: MovieLocalDataSource,
  ) {}

  async execute(): Promise<Movie[] | AppError> {
    try {
      const dtos = await this.localDataSource.getFavorites();
      return MovieMapper.toEntityList(dtos);
    } catch (error: any) {
      if (error instanceof AppError) {
        return error;
      }
      return new AppError(MessageCode.ERROR_GET_USER_LIST);
    }
  }
}

