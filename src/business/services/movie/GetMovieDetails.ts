import { injectable, inject } from "inversify";
import { Movie } from "@/business/domain/models/movie/Movie";
import type { IGetMovieDetailsRepository } from "@/business/domain/repositories/movie/get-details";
import { MovieTokens } from "libs/inversifyjs/tokens/movieTokens";
import { IUseCase } from "business/services/UseCase";
import { IAPIResponse } from "@/business/domain/common/api-response";
import AppError from "@/business/tools/AppError";

@injectable()
export class GetMovieDetails implements IUseCase<string, Movie> {
  constructor(
    @inject(MovieTokens.IGetMovieDetailsRepository)
    private readonly movieRepository: IGetMovieDetailsRepository,
  ) {}

  async execute(id: string): Promise<IAPIResponse<Movie> | AppError> {
    return this.movieRepository.execute(id);
  }
}
