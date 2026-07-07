import { Movie } from "domain/entities/Movie";
import AppError from "domain/errors/AppError";

export interface IGetUserListRepository {
  execute(): Promise<Movie[] | AppError>;
}
