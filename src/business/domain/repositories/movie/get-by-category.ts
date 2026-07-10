import { GetMovieDTO } from "@/business/domain/dtos/movie/get";
import { IGetByCategoryBaseRepository } from "../base/get-by-category";

export interface IGetMoviesByCategoryRepository extends IGetByCategoryBaseRepository<GetMovieDTO> {}
