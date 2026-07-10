import { GetMovieDTO } from "@/business/domain/dtos/movie/get";
import AppError from "@/business/tools/app-error";
import type { IAPIResponse } from "@/business/domain/common/api-response";

export interface ICreateMovieInUserListRepository {
  execute(movie: GetMovieDTO): Promise<IAPIResponse<GetMovieDTO[]> | AppError>;
}
