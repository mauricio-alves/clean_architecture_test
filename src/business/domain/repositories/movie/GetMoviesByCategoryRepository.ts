import { Movie } from "business/domain/models/Movie";
import AppError from "business/domain/errors/AppError";

export interface IGetMoviesByCategoryRepository {
  execute(category: string): Promise<Movie[] | AppError>;
}
