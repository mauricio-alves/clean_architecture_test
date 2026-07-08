import { injectable, inject } from "inversify";
import { Movie } from "business/domain/models/Movie";
import type { IGetMovieDetailsRepository } from "business/domain/repositories/movie/GetMovieDetailsRepository";
import { MovieRemoteDataSource } from "infrastructure/dataSources/remote/MovieRemoteDataSource";
import { MovieMapper } from "business/mappers/MovieMapper";
import { MovieTokens } from "libs/inversifyjs/tokens/movieTokens"; import { UserListTokens } from "libs/inversifyjs/tokens/userListTokens"; import { InfraTokens } from "libs/inversifyjs/tokens/infrastructureTokens";
import AppError from "business/domain/errors/AppError";
import { MessageCode } from "business/domain/common/MessageCodes";

@injectable()
export class GetMovieDetailsRepositoryImpl implements IGetMovieDetailsRepository {
  constructor(
    @inject(MovieTokens.IMovieRemoteDataSource)
    private readonly remoteDataSource: MovieRemoteDataSource
  ) {}

  async execute(id: string): Promise<Movie | AppError> {
    try {
      const dto = await this.remoteDataSource.getMovieDetails(id);
      return MovieMapper.toEntity(dto);
    } catch (error: any) {
      if (error instanceof AppError) {
        return error;
      }
      return new AppError(MessageCode.ERROR_GET_MOVIE_DETAILS);
    }
  }
}

