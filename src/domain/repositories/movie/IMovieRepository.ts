import { Movie } from "domain/entities/Movie";

export interface IMovieRepository {
  getMoviesByCategory(category: string): Promise<Movie[]>;
  getMovieDetails(id: string): Promise<Movie>;
}
