import { GetMovieDTO } from "@/business/domain/dtos/movie/get";
import AppError from "@/business/tools/app-error";
import type { IAPIResponse } from "@/business/domain/common/api-response";

export interface IGetUserListRepository {
  execute(): Promise<IAPIResponse<GetMovieDTO[]> | AppError>;
}
