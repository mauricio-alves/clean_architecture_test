import { Movie } from "@/business/domain/models/movie/Movie";
import { IGetBaseRepository } from "../base/get";

export interface IGetMovieDetailsRepository extends IGetBaseRepository<Movie> {}
