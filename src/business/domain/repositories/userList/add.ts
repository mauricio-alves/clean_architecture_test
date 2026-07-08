import { Movie } from "@/business/domain/models/movie/Movie";
import AppError from "@/business/tools/AppError";
import type { IAPIResponse } from "@/business/domain/common/api-response";

export interface IAddMovieToUserListRepository {
  execute(movie: Movie): Promise<IAPIResponse<Movie[]> | AppError>;
}
