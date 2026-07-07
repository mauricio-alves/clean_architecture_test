import { injectable, inject } from "inversify";
import { Movie } from "domain/entities/Movie";
import type { IGetUserListRepository } from "domain/repositories/userList/IGetUserListRepository";
import { MovieLocalDataSource } from "data/dataSources/local/MovieLocalDataSource";
import { MovieMapper } from "data/mappers/MovieMapper";
import { TOKENS } from "libs/inversifyjs/tokens";
import AppError from "domain/errors/AppError";
import { MessageCode } from "domain/common/MessageCodes";

@injectable()
export class GetUserListRepositoryImpl implements IGetUserListRepository {
  constructor(
    @inject(TOKENS.IMovieLocalDataSource)
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
