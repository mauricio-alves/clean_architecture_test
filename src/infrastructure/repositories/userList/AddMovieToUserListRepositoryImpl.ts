import { injectable, inject } from "inversify";
import { Movie } from "business/domain/models/Movie";
import type { IAddMovieToUserListRepository } from "business/domain/repositories/userList/AddMovieToUserListRepository";
import { MovieLocalDataSource } from "infrastructure/dataSources/local/MovieLocalDataSource";
import { MovieMapper } from "business/mappers/MovieMapper";
import { MovieTokens } from "libs/inversifyjs/tokens/movieTokens"; import { UserListTokens } from "libs/inversifyjs/tokens/userListTokens"; import { InfraTokens } from "libs/inversifyjs/tokens/infrastructureTokens";
import AppError from "business/domain/errors/AppError";
import { MessageCode } from "business/domain/common/MessageCodes";

@injectable()
export class AddMovieToUserListRepositoryImpl implements IAddMovieToUserListRepository {
  constructor(
    @inject(MovieTokens.IMovieLocalDataSource)
    private readonly localDataSource: MovieLocalDataSource,
  ) {}

  async execute(movie: Movie): Promise<Movie[] | AppError> {
    try {
      const dtos = await this.localDataSource.getFavorites();
      const newDto = MovieMapper.toDTO(movie);
      const updatedDtos = [...dtos, newDto];
      await this.localDataSource.saveFavorites(updatedDtos);
      return MovieMapper.toEntityList(updatedDtos);
    } catch (error: any) {
      if (error instanceof AppError) {
        return error;
      }
      return new AppError(MessageCode.ERROR_ADD_MOVIE);
    }
  }
}

