import { injectable, inject } from "inversify";
import { Movie } from "domain/entities/Movie";
import type { IGetMovieDetailsRepository } from "domain/repositories/movie/GetMovieDetailsRepository";
import { TOKENS } from "libs/inversifyjs/tokens";
import { IUseCase } from "domain/useCases/UseCase";
import { IAPIResponse } from "domain/useCases/APIResponse";
import AppError from "domain/errors/AppError";

@injectable()
export class GetMovieDetails implements IUseCase<string, Movie> {
  constructor(
    @inject(TOKENS.IGetMovieDetailsRepository)
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
