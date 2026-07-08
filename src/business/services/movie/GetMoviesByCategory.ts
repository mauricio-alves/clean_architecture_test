import { injectable, inject } from "inversify";
import { Movie } from "@/business/domain/models/movie/Movie";
import type { IGetMoviesByCategoryRepository } from "@/business/domain/repositories/movie/get-by-category";
import { MovieTokens } from "libs/inversifyjs/tokens/movieTokens";
import { IUseCase } from "business/services/UseCase";
import { IAPIResponse } from "@/business/domain/common/api-response";
import AppError from "@/business/tools/AppError";

@injectable()
export class GetMoviesByCategory implements IUseCase<string, Movie[]> {
  constructor(
    @inject(MovieTokens.IGetMoviesByCategoryRepository)
    private readonly movieRepository: IGetMoviesByCategoryRepository,
  ) {}

  async execute(category: string): Promise<IAPIResponse<Movie[]> | AppError> {
    return this.movieRepository.execute(category);
  }
}
