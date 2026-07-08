import { Movie } from "business/domain/models/Movie";
import AppError from "business/domain/errors/AppError";

export interface IGetUserListRepository {
  execute(): Promise<Movie[] | AppError>;
}
