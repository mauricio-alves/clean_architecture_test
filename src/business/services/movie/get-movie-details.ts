import { IGetMovieDetailsUseCase } from "@/business/domain/services/movie/get-movie-details";
import { injectable, inject } from "inversify";
import { Movie } from "@/business/domain/models/movie/movie";
import type { IGetMovieDetailsRepository } from "@/business/domain/repositories/movie/get-details";
import type { GetMovieDTO } from "@/business/domain/dtos/movie/get";
import { MovieTokens } from "@/libs/inversifyjs/tokens/movie-tokens";
import { BaseGetUseCase } from "@/business/services/base/get";
import { MovieMapper } from "@/business/mappers/movie-mapper";

@injectable()
export class GetMovieDetails extends BaseGetUseCase<Movie, GetMovieDTO> implements IGetMovieDetailsUseCase {
  constructor(
    @inject(MovieTokens.IGetMovieDetailsRepository)
    private readonly movieRepository: IGetMovieDetailsRepository,
  ) {
    super();
  }

  protected get repository(): IGetMovieDetailsRepository {
    return this.movieRepository;
  }

  protected toEntity(dto: GetMovieDTO): Movie {
    return MovieMapper.toEntity(dto);
  }
}
