import { Movie } from "business/domain/models/Movie";
import AppError from "business/domain/errors/AppError";

export interface IAddMovieToUserListRepository {
  execute(movie: Movie): Promise<Movie[] | AppError>;
}
