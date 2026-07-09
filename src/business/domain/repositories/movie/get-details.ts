import { Movie } from "@/business/domain/models/movie/movie";
import { IGetBaseRepository } from "../base/get";

export interface IGetMovieDetailsRepository extends IGetBaseRepository<Movie> {}
