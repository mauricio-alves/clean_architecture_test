import { injectable, inject } from "inversify";
import { Movie } from "business/domain/models/Movie";
import type { IGetMovieDetailsRepository } from "business/domain/repositories/movie/GetMovieDetailsRepository";
import { MovieTokens } from "libs/inversifyjs/tokens/movieTokens"; import { UserListTokens } from "libs/inversifyjs/tokens/userListTokens"; import { InfraTokens } from "libs/inversifyjs/tokens/infrastructureTokens";
import { IUseCase } from "business/services/UseCase";
import { IAPIResponse } from "business/services/APIResponse";
import AppError from "business/domain/errors/AppError";

@injectable()
export class GetMovieDetails implements IUseCase<string, Movie> {
  constructor(
    @inject(MovieTokens.IGetMovieDetailsRepository)
    private readonly movieRepository: IGetMovieDetailsRepository,
  ) {}

  async execute(id: string): Promise<IAPIResponse<Movie> | AppError> {
    const response = await this.movieRepository.execute(id);
    if (response instanceof AppError) {
      return response;
    }
    return { data: response };
  }
}

