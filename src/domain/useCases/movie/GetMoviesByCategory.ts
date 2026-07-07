import { injectable, inject } from "inversify";
import { Movie } from "domain/entities/Movie";
import type { IGetMoviesByCategoryRepository } from "domain/repositories/movie/GetMoviesByCategoryRepository";
import { TOKENS } from "libs/inversifyjs/tokens";
import { IUseCase } from "domain/useCases/UseCase";
import { IAPIResponse } from "domain/useCases/APIResponse";
import AppError from "domain/errors/AppError";

@injectable()
export class GetMoviesByCategory implements IUseCase<string, Movie[]> {
  constructor(
    @inject(TOKENS.IGetMoviesByCategoryRepository)
    private readonly movieRepository: IGetMoviesByCategoryRepository,
  ) {}

  async execute(category: string): Promise<IAPIResponse<Movie[]> | AppError> {
    const response = await this.movieRepository.execute(category);
    if (response instanceof AppError) {
      return response;
    }
    return { data: response };
  }
}
