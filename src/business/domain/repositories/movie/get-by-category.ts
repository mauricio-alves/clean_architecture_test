import { Movie } from "@/business/domain/models/movie/movie";
import { IGetByCategoryBaseRepository } from "../base/get-by-category";

export interface IGetMoviesByCategoryRepository extends IGetByCategoryBaseRepository<Movie> {}
