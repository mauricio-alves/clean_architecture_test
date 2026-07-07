import { Movie } from "domain/entities/Movie";
import AppError from "domain/errors/AppError";

export interface IRemoveMovieFromUserListRepository {
  execute(movieId: number): Promise<Movie[] | AppError>;
}
