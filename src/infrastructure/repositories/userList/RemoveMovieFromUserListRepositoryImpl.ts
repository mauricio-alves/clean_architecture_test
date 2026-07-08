import { injectable, inject } from "inversify";
import { Movie } from "business/domain/models/Movie";
import type { IRemoveMovieFromUserListRepository } from "business/domain/repositories/userList/RemoveMovieFromUserListRepository";
import { MovieLocalDataSource } from "infrastructure/dataSources/local/MovieLocalDataSource";
import { MovieMapper } from "business/mappers/MovieMapper";
import { MovieTokens } from "libs/inversifyjs/tokens/movieTokens"; import { UserListTokens } from "libs/inversifyjs/tokens/userListTokens"; import { InfraTokens } from "libs/inversifyjs/tokens/infrastructureTokens";
import AppError from "business/domain/errors/AppError";
import { MessageCode } from "business/domain/common/MessageCodes";

@injectable()
export class RemoveMovieFromUserListRepositoryImpl implements IRemoveMovieFromUserListRepository {
  constructor(
    @inject(MovieTokens.IMovieLocalDataSource)
    private readonly localDataSource: MovieLocalDataSource,
  ) {}

  async execute(movieId: number): Promise<Movie[] | AppError> {
    try {
      const dtos = await this.localDataSource.getFavorites();
      const updatedDtos = dtos.filter((dto) => dto.id !== movieId);
      await this.localDataSource.saveFavorites(updatedDtos);
      return MovieMapper.toEntityList(updatedDtos);
    } catch (error: any) {
      if (error instanceof AppError) {
        return error;
      }
      return new AppError(MessageCode.ERROR_REMOVE_MOVIE);
    }
  }
}

