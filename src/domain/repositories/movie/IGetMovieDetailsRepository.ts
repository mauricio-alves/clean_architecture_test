import { Movie } from "domain/entities/Movie";
import AppError from "domain/errors/AppError";

export interface IGetMovieDetailsRepository {
  execute(id: string): Promise<Movie | AppError>;
}
