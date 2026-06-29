import { injectable, inject } from "inversify";
import { Movie } from "domain/entities/Movie";
import type { IGetUserListRepository } from "domain/repositories/userList/IGetUserListRepository";
import { MovieLocalDataSource } from "data/dataSources/local/MovieLocalDataSource";
import { MovieMapper } from "data/mappers/MovieMapper";
import { TOKENS } from "libs/inversifyjs/tokens";
import AppError from "domain/errors/AppError";

@injectable()
export class GetUserListRepositoryImpl implements IGetUserListRepository {
  constructor(
    @inject(TOKENS.MovieLocalDataSource)
    private readonly localDataSource: MovieLocalDataSource,
  ) {}

  public async execute(): Promise<Movie[] | AppError> {
    try {
      const dtos = await this.localDataSource.getFavorites();
      return MovieMapper.toEntityList(dtos);
    } catch (error: any) {
      return new AppError(error.message || "Erro ao obter lista de favoritos");
    }
  }
}
