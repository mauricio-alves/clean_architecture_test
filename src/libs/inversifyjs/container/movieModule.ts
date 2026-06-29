import { ContainerModule } from "inversify";
import { TOKENS } from "libs/inversifyjs/tokens";

import { MovieRemoteDataSource } from "data/dataSources/remote/MovieRemoteDataSource";
import { MovieLocalDataSource } from "data/dataSources/local/MovieLocalDataSource";

import type { IMovieRepository } from "domain/repositories/movie/IMovieRepository";
import { MovieRepositoryImpl } from "data/repositories/movie/MovieRepositoryImpl";

import { GetMoviesByCategory } from "domain/useCases/movie/GetMoviesByCategory";
import { GetMovieDetails } from "domain/useCases/movie/GetMovieDetails";

export const movieModule = new ContainerModule(({ bind }) => {
  bind<MovieRemoteDataSource>(TOKENS.MovieRemoteDataSource).to(MovieRemoteDataSource);
  bind<MovieLocalDataSource>(TOKENS.MovieLocalDataSource).to(MovieLocalDataSource);

  bind<IMovieRepository>(TOKENS.IMovieRepository).to(MovieRepositoryImpl);

  bind<GetMoviesByCategory>(TOKENS.GetMoviesByCategory).to(GetMoviesByCategory);
  bind<GetMovieDetails>(TOKENS.GetMovieDetails).to(GetMovieDetails);
});
