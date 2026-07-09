import { IGetMovieDetailsUseCase } from "@/business/domain/services/movie/get-movie-details";
import { injectable, inject } from "inversify";
import { Movie } from "@/business/domain/models/movie/movie";
import type { IGetMovieDetailsRepository } from "@/business/domain/repositories/movie/get-details";
import { MovieTokens } from "libs/inversifyjs/tokens/movie-tokens";
import { BaseGetUseCase } from "@/business/services/base/get";

@injectable()
export class GetMovieDetails extends BaseGetUseCase<Movie> implements IGetMovieDetailsUseCase {
  constructor(
    @inject(MovieTokens.IGetMovieDetailsRepository)
    private readonly movieRepository: IGetMovieDetailsRepository,
  ) {
    super();
  }

  protected get repository(): IGetMovieDetailsRepository {
    return this.movieRepository;
  }
}
