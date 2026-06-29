import { injectable, inject } from "inversify";
import { Movie } from "domain/entities/Movie";
import type { IUserListRepository } from "domain/repositories/userList/IUserListRepository";
import { MovieLocalDataSource } from "data/dataSources/local/MovieLocalDataSource";
import { MovieMapper } from "data/mappers/MovieMapper";
import { TOKENS } from "libs/inversifyjs/tokens";

@injectable()
export class UserListRepositoryImpl implements IUserListRepository {
  constructor(
    @inject(TOKENS.MovieLocalDataSource)
    private readonly localDataSource: MovieLocalDataSource
  ) {}

  public async getUserList(): Promise<Movie[]> {
    const dtos = await this.localDataSource.getFavorites();
    return MovieMapper.toEntityList(dtos);
  }

  public async addMovie(movie: Movie): Promise<Movie[]> {
    const dtos = await this.localDataSource.getFavorites();
    const newDto = MovieMapper.toDTO(movie);
    const updatedDtos = [...dtos, newDto];
    await this.localDataSource.saveFavorites(updatedDtos);
    return MovieMapper.toEntityList(updatedDtos);
  }

  public async removeMovie(movieId: number): Promise<Movie[]> {
    const dtos = await this.localDataSource.getFavorites();
    const updatedDtos = dtos.filter((dto) => dto.id !== movieId);
    await this.localDataSource.saveFavorites(updatedDtos);
    return MovieMapper.toEntityList(updatedDtos);
  }
}
