import { Movie } from "@/business/domain/models/movie/movie";
import { IUseCase } from "@/business/domain/common/use-case";

export interface IDeleteMovieFromUserListUseCase extends IUseCase<string, Movie[]> {}
