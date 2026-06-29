import { injectable, inject } from "inversify";
import { Movie } from "domain/entities/Movie";
import type { IMovieRepository } from "domain/repositories/movie/IMovieRepository";
import { TOKENS } from "libs/inversifyjs/tokens";

@injectable()
export class GetMovieDetails {
  constructor(
    @inject(TOKENS.IMovieRepository)
    private readonly movieRepository: IMovieRepository
  ) {}

  public execute(id: string): Promise<Movie> {
    return this.movieRepository.getMovieDetails(id);
  }
}
