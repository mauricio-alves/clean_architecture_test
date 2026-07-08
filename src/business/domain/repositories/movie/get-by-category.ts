import { Movie } from "@/business/domain/models/movie/Movie";
import { IGetByCategoryBaseRepository } from "../base/get-by-category";

export interface IGetMoviesByCategoryRepository extends IGetByCategoryBaseRepository<Movie> {}
