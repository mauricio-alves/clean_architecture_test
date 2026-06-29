import { injectable, inject } from "inversify";
import { Movie } from "domain/entities/Movie";
import type { IMovieRepository } from "domain/repositories/movie/IMovieRepository";
import { MovieRemoteDataSource } from "data/dataSources/remote/MovieRemoteDataSource";
import { MovieMapper } from "data/mappers/MovieMapper";
import { TOKENS } from "libs/inversifyjs/tokens";

@injectable()
export class MovieRepositoryImpl implements IMovieRepository {
  constructor(
    @inject(TOKENS.MovieRemoteDataSource)
    private readonly remoteDataSource: MovieRemoteDataSource
  ) {}

  public async getMoviesByCategory(category: string): Promise<Movie[]> {
    const dtos = await this.remoteDataSource.getMoviesByCategory(category);
    return MovieMapper.toEntityList(dtos);
  }

  public async getMovieDetails(id: string): Promise<Movie> {
    const dto = await this.remoteDataSource.getMovieDetails(id);
    return MovieMapper.toEntity(dto);
  }
}
