import { injectable, inject } from "inversify";
import { Movie } from "@/business/domain/models/movie/Movie";
import type { IAddMovieToUserListRepository } from "@/business/domain/repositories/userList/add";
import { MovieLocalDataSource } from "infrastructure/dataSources/local/MovieLocalDataSource";
import { MovieMapper } from "@/business/mappers/MovieMapper";
import { MovieTokens } from "libs/inversifyjs/tokens/movieTokens";
import { CodeMessagesEnum } from "@/business/domain/common/enums/code-messages";
import { handleResponseRepository } from "@/infrastructure/utils/handle-response-repository";
import type { IAPIResponse } from "@/business/domain/common/api-response";
import AppError from "@/business/tools/AppError";

@injectable()
export class AddMovieToUserListRepositoryImpl implements IAddMovieToUserListRepository {
  constructor(
    @inject(MovieTokens.IMovieLocalDataSource)
    private readonly localDataSource: MovieLocalDataSource,
  ) {}

  async execute(movie: Movie): Promise<IAPIResponse<Movie[]> | AppError> {
    return handleResponseRepository(
      async () => {
        const dtos = await this.localDataSource.getFavorites();
        const exists = dtos.some((m) => m.id === movie.id);
        if (exists) {
          throw new AppError(CodeMessagesEnum.MOVIE_ALREADY_IN_LIST);
        }
        
        const newDto = MovieMapper.toDTO(movie);
        const updatedDtos = [...dtos, newDto];
        await this.localDataSource.saveFavorites(updatedDtos);
        
        return MovieMapper.toEntityList(updatedDtos);
      },
      CodeMessagesEnum.ERROR_ADD_MOVIE_TO_USER_LIST
    );
  }
}
