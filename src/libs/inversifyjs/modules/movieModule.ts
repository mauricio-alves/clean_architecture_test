import { ContainerModule } from "inversify";
import { MovieTokens } from "libs/inversifyjs/tokens/movieTokens";

import { MovieRemoteDataSource } from "infrastructure/dataSources/remote/MovieRemoteDataSource";
import { MovieLocalDataSource } from "infrastructure/dataSources/local/MovieLocalDataSource";

import type { IGetMoviesByCategoryRepository } from "business/domain/repositories/movie/GetMoviesByCategoryRepository";
import type { IGetMovieDetailsRepository } from "business/domain/repositories/movie/GetMovieDetailsRepository";

import { GetMoviesByCategoryRepositoryImpl } from "infrastructure/repositories/movie/GetMoviesByCategoryRepositoryImpl";
import { GetMovieDetailsRepositoryImpl } from "infrastructure/repositories/movie/GetMovieDetailsRepositoryImpl";

import { GetMoviesByCategory } from "business/services/movie/GetMoviesByCategory";
import { GetMovieDetails } from "business/services/movie/GetMovieDetails";

export const movieModule = new ContainerModule(({ bind }) => {
  bind<MovieRemoteDataSource>(MovieTokens.IMovieRemoteDataSource).to(MovieRemoteDataSource);
  bind<MovieLocalDataSource>(MovieTokens.IMovieLocalDataSource).to(MovieLocalDataSource);

  bind<IGetMoviesByCategoryRepository>(MovieTokens.IGetMoviesByCategoryRepository).to(GetMoviesByCategoryRepositoryImpl);
  bind<IGetMovieDetailsRepository>(MovieTokens.IGetMovieDetailsRepository).to(GetMovieDetailsRepositoryImpl);

  bind<GetMoviesByCategory>(MovieTokens.IGetMoviesByCategory).to(GetMoviesByCategory);
  bind<GetMovieDetails>(MovieTokens.IGetMovieDetails).to(GetMovieDetails);
});
