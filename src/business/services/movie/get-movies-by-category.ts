import { IGetMoviesByCategoryUseCase } from "@/business/domain/services/movie/get-movies-by-category";
import { injectable, inject } from "inversify";
import { Movie } from "@/business/domain/models/movie/movie";
import type { IGetMoviesByCategoryRepository } from "@/business/domain/repositories/movie/get-by-category";
import { MovieTokens } from "libs/inversifyjs/tokens/movie-tokens";
import { BaseGetByCategoryUseCase } from "@/business/services/base/get-by-category";

@injectable()
export class GetMoviesByCategory extends BaseGetByCategoryUseCase<Movie> implements IGetMoviesByCategoryUseCase {
  constructor(
    @inject(MovieTokens.IGetMoviesByCategoryRepository)
    private readonly movieRepository: IGetMoviesByCategoryRepository,
  ) {
    super();
  }

  protected get repository(): IGetMoviesByCategoryRepository {
    return this.movieRepository;
  }
}
