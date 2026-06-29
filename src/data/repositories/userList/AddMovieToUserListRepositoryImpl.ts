import { injectable, inject } from "inversify";
import { Movie } from "domain/entities/Movie";
import type { IAddMovieToUserListRepository } from "domain/repositories/userList/IAddMovieToUserListRepository";
import { MovieLocalDataSource } from "data/dataSources/local/MovieLocalDataSource";
import { MovieMapper } from "data/mappers/MovieMapper";
import { TOKENS } from "libs/inversifyjs/tokens";
import AppError from "domain/errors/AppError";

@injectable()
export class AddMovieToUserListRepositoryImpl implements IAddMovieToUserListRepository {
  constructor(
    @inject(TOKENS.IMovieLocalDataSource)
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
      return new AppError(error.message || "Erro ao adicionar filme à lista");
    }
  }
}
