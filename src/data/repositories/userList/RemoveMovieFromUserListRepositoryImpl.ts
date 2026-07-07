import { injectable, inject } from "inversify";
import { Movie } from "domain/entities/Movie";
import type { IRemoveMovieFromUserListRepository } from "domain/repositories/userList/IRemoveMovieFromUserListRepository";
import { MovieLocalDataSource } from "data/dataSources/local/MovieLocalDataSource";
import { MovieMapper } from "data/mappers/MovieMapper";
import { TOKENS } from "libs/inversifyjs/tokens";
import AppError from "domain/errors/AppError";
import { MessageCode } from "domain/common/MessageCodes";

@injectable()
export class RemoveMovieFromUserListRepositoryImpl implements IRemoveMovieFromUserListRepository {
  constructor(
    @inject(TOKENS.IMovieLocalDataSource)
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
