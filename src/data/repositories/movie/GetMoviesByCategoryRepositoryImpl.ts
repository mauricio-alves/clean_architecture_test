import { injectable, inject } from "inversify";
import { Movie } from "domain/entities/Movie";
import type { IGetMoviesByCategoryRepository } from "domain/repositories/movie/IGetMoviesByCategoryRepository";
import { MovieRemoteDataSource } from "data/dataSources/remote/MovieRemoteDataSource";
import { MovieMapper } from "data/mappers/MovieMapper";
import { TOKENS } from "libs/inversifyjs/tokens";
import AppError from "domain/errors/AppError";
import { MessageCode } from "domain/common/MessageCodes";

@injectable()
export class GetMoviesByCategoryRepositoryImpl implements IGetMoviesByCategoryRepository {
  constructor(
    @inject(TOKENS.IMovieRemoteDataSource)
    private readonly remoteDataSource: MovieRemoteDataSource
  ) {}

  async execute(category: string): Promise<Movie[] | AppError> {
    try {
      const dtos = await this.remoteDataSource.getMoviesByCategory(category);
      return MovieMapper.toEntityList(dtos);
    } catch (error: any) {
      if (error instanceof AppError) {
        return error;
      }
      return new AppError(MessageCode.ERROR_GET_MOVIES);
    }
  }
}
