import { ContainerModule } from "inversify";
import { TOKENS } from "libs/inversifyjs/tokens";

import { MovieRemoteDataSource } from "data/dataSources/remote/MovieRemoteDataSource";
import { MovieLocalDataSource } from "data/dataSources/local/MovieLocalDataSource";

import type { IGetMoviesByCategoryRepository } from "domain/repositories/movie/IGetMoviesByCategoryRepository";
import type { IGetMovieDetailsRepository } from "domain/repositories/movie/IGetMovieDetailsRepository";

import { GetMoviesByCategoryRepositoryImpl } from "data/repositories/movie/GetMoviesByCategoryRepositoryImpl";
import { GetMovieDetailsRepositoryImpl } from "data/repositories/movie/GetMovieDetailsRepositoryImpl";

import { GetMoviesByCategory } from "domain/useCases/movie/GetMoviesByCategory";
import { GetMovieDetails } from "domain/useCases/movie/GetMovieDetails";

export const movieModule = new ContainerModule(({ bind }) => {
  bind<MovieRemoteDataSource>(TOKENS.IMovieRemoteDataSource).to(MovieRemoteDataSource);
  bind<MovieLocalDataSource>(TOKENS.IMovieLocalDataSource).to(MovieLocalDataSource);

  bind<IGetMoviesByCategoryRepository>(TOKENS.IGetMoviesByCategoryRepository).to(GetMoviesByCategoryRepositoryImpl);
  bind<IGetMovieDetailsRepository>(TOKENS.IGetMovieDetailsRepository).to(GetMovieDetailsRepositoryImpl);

  bind<GetMoviesByCategory>(TOKENS.IGetMoviesByCategory).to(GetMoviesByCategory);
  bind<GetMovieDetails>(TOKENS.IGetMovieDetails).to(GetMovieDetails);
});
