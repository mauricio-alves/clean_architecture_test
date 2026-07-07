import { Movie } from "domain/entities/Movie";
import AppError from "domain/errors/AppError";

export interface IGetMoviesByCategoryRepository {
  execute(category: string): Promise<Movie[] | AppError>;
}
