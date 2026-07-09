import { Movie } from "@/business/domain/models/movie/movie";
import AppError from "@/business/tools/app-error";
import type { IAPIResponse } from "@/business/domain/common/api-response";

export interface IDeleteMovieFromUserListRepository {
  execute(id: string): Promise<IAPIResponse<Movie[]> | AppError>;
}
