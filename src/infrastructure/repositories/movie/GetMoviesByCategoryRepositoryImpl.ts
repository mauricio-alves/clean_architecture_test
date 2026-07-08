import { injectable, inject } from "inversify";
import { Movie } from "business/domain/models/Movie";
import type { IGetMoviesByCategoryRepository } from "business/domain/repositories/movie/GetMoviesByCategoryRepository";
import { MovieRemoteDataSource } from "infrastructure/dataSources/remote/MovieRemoteDataSource";
import { MovieMapper } from "business/mappers/MovieMapper";
import { MovieTokens } from "libs/inversifyjs/tokens/movieTokens"; import { UserListTokens } from "libs/inversifyjs/tokens/userListTokens"; import { InfraTokens } from "libs/inversifyjs/tokens/infrastructureTokens";
import AppError from "business/domain/errors/AppError";
import { MessageCode } from "business/domain/common/MessageCodes";

@injectable()
export class GetMoviesByCategoryRepositoryImpl implements IGetMoviesByCategoryRepository {
  constructor(
    @inject(MovieTokens.IMovieRemoteDataSource)
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

