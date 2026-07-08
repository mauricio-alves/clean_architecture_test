import { injectable, inject } from "inversify";
import { Movie } from "business/domain/models/Movie";
import type { IGetMoviesByCategoryRepository } from "business/domain/repositories/movie/GetMoviesByCategoryRepository";
import { MovieTokens } from "libs/inversifyjs/tokens/movieTokens"; import { UserListTokens } from "libs/inversifyjs/tokens/userListTokens"; import { InfraTokens } from "libs/inversifyjs/tokens/infrastructureTokens";
import { IUseCase } from "business/services/UseCase";
import { IAPIResponse } from "business/services/APIResponse";
import AppError from "business/domain/errors/AppError";

@injectable()
export class GetMoviesByCategory implements IUseCase<string, Movie[]> {
  constructor(
    @inject(MovieTokens.IGetMoviesByCategoryRepository)
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

