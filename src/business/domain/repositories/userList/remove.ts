import { Movie } from "@/business/domain/models/movie/Movie";
import AppError from "@/business/tools/AppError";
import type { IAPIResponse } from "@/business/domain/common/api-response";

export interface IRemoveMovieFromUserListRepository {
  execute(id: string): Promise<IAPIResponse<Movie[]> | AppError>;
}
