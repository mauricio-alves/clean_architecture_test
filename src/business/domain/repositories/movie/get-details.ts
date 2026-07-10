import { GetMovieDTO } from "@/business/domain/dtos/movie/get";
import { IGetBaseRepository } from "../base/get";

export interface IGetMovieDetailsRepository extends IGetBaseRepository<GetMovieDTO> {}
