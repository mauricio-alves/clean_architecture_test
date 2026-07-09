import { Movie } from "@/business/domain/models/movie/movie";
import { IGetByCategoryBaseUseCase } from "@/business/domain/services/base/get-by-category";

export interface IGetMoviesByCategoryUseCase extends IGetByCategoryBaseUseCase<Movie> {}
