import { injectable, inject } from "inversify";
import { Movie } from "domain/entities/Movie";
import type { IMovieRepository } from "domain/repositories/movie/IMovieRepository";
import { TOKENS } from "libs/inversifyjs/tokens";

@injectable()
export class GetMoviesByCategory {
  constructor(
    @inject(TOKENS.IMovieRepository)
    private readonly movieRepository: IMovieRepository
  ) {}

  public execute(category: string): Promise<Movie[]> {
    return this.movieRepository.getMoviesByCategory(category);
  }
}
