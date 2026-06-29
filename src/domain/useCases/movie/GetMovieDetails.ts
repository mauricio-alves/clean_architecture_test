import { injectable, inject } from "inversify";
import { Movie } from "domain/entities/Movie";
import type { IMovieRepository } from "domain/repositories/movie/IMovieRepository";
import { TOKENS } from "libs/inversifyjs/tokens";
import { IUseCase } from "domain/useCases/IUseCase";
import { IAPIResponse } from "domain/useCases/IAPIResponse";
import AppError from "domain/errors/AppError";

@injectable()
export class GetMovieDetails implements IUseCase<string, Movie> {
  constructor(
    @inject(TOKENS.IMovieRepository)
    private readonly movieRepository: IMovieRepository,
  ) {}

  async execute(id: string): Promise<IAPIResponse<Movie> | AppError> {
    const response = await this.movieRepository.getMovieDetails(id);
    if (response instanceof AppError) {
      return response;
    }
    return { data: response };
  }
}
