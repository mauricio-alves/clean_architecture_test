import { injectable, inject } from "inversify";
import { Movie } from "domain/entities/Movie";
import type { IGetMovieDetailsRepository } from "domain/repositories/movie/IGetMovieDetailsRepository";
import { MovieRemoteDataSource } from "data/dataSources/remote/MovieRemoteDataSource";
import { MovieMapper } from "data/mappers/MovieMapper";
import { TOKENS } from "libs/inversifyjs/tokens";
import AppError from "domain/errors/AppError";
import { MessageCode } from "domain/common/MessageCodes";

@injectable()
export class GetMovieDetailsRepositoryImpl implements IGetMovieDetailsRepository {
  constructor(
    @inject(TOKENS.IMovieRemoteDataSource)
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
