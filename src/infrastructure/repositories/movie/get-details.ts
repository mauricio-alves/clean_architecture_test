import { injectable, inject } from "inversify";
import { Movie } from "@/business/domain/models/movie/Movie";
import type { IGetMovieDetailsRepository } from "@/business/domain/repositories/movie/get-details";
import { MovieRemoteDataSource } from "infrastructure/dataSources/remote/MovieRemoteDataSource";
import { MovieMapper } from "@/business/mappers/MovieMapper";
import { MovieTokens } from "libs/inversifyjs/tokens/movieTokens";
import { CodeMessagesEnum } from "@/business/domain/common/enums/code-messages";
import { BaseGetRepository } from "@/infrastructure/repositories/base/get";

@injectable()
export class GetMovieDetailsRepository extends BaseGetRepository<Movie> implements IGetMovieDetailsRepository {
  constructor(
    @inject(MovieTokens.IMovieRemoteDataSource)
    private readonly remoteDataSource: MovieRemoteDataSource,
  ) {
    super();
  }

  protected getErrorCode(): CodeMessagesEnum {
    return CodeMessagesEnum.ERROR_GET_MOVIE_DETAILS;
  }

  protected async fetchData(id: string): Promise<Movie> {
    const dto = await this.remoteDataSource.getMovieDetails(id);
    return MovieMapper.toEntity(dto);
  }
}
