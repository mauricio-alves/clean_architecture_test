import AppError from "domain/errors/AppError";
import { Movie } from "domain/entities/Movie";

export interface IMovieRepository {
  getMoviesByCategory(category: string): Promise<Movie[] | AppError>;
  getMovieDetails(id: string): Promise<Movie | AppError>;
}
