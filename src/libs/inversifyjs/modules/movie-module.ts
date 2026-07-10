import { ContainerModule } from "inversify";
import { MovieTokens } from "@/libs/inversifyjs/tokens/movie-tokens";

import type { IGetMoviesByCategoryRepository } from "@/business/domain/repositories/movie/get-by-category";
import type { IGetMovieDetailsRepository } from "@/business/domain/repositories/movie/get-details";

import { GetMoviesByCategoryRepositoryImpl } from "@/infrastructure/repositories/movie/get-movies-by-category";
import { GetMovieDetailsRepository } from "@/infrastructure/repositories/movie/get-details";

import { GetMoviesByCategory } from "@/business/services/movie/get-movies-by-category";
import type { IGetMoviesByCategoryUseCase } from "@/business/domain/services/movie/get-movies-by-category";
import { GetMovieDetails } from "@/business/services/movie/get-movie-details";
import type { IGetMovieDetailsUseCase } from "@/business/domain/services/movie/get-movie-details";

export const movieModule = new ContainerModule(({ bind }) => {
  bind<IGetMoviesByCategoryRepository>(MovieTokens.IGetMoviesByCategoryRepository).to(GetMoviesByCategoryRepositoryImpl);
  bind<IGetMovieDetailsRepository>(MovieTokens.IGetMovieDetailsRepository).to(GetMovieDetailsRepository);

  bind<IGetMoviesByCategoryUseCase>(MovieTokens.IGetMoviesByCategory).to(GetMoviesByCategory);
  bind<IGetMovieDetailsUseCase>(MovieTokens.IGetMovieDetails).to(GetMovieDetails);
});
