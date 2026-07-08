import { Movie } from "business/domain/models/Movie";
import AppError from "business/domain/errors/AppError";

export interface IRemoveMovieFromUserListRepository {
  execute(movieId: number): Promise<Movie[] | AppError>;
}
