import { Movie } from "@/business/domain/models/movie/movie";
import { IGetBaseUseCase } from "@/business/domain/services/base/get";

export interface IGetMovieDetailsUseCase extends IGetBaseUseCase<Movie> {}
