import { Movie } from "domain/entities/Movie";
import AppError from "domain/errors/AppError";

export interface IAddMovieToUserListRepository {
  execute(movie: Movie): Promise<Movie[] | AppError>;
}
