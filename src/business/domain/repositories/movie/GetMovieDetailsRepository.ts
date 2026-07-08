import { Movie } from "business/domain/models/Movie";
import AppError from "business/domain/errors/AppError";

export interface IGetMovieDetailsRepository {
  execute(id: string): Promise<Movie | AppError>;
}
