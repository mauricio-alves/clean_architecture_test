import { injectable, inject } from "inversify";
import { Movie } from "business/domain/models/Movie";
import type { IGetUserListRepository } from "business/domain/repositories/userList/GetUserListRepository";
import type { IAddMovieToUserListRepository } from "business/domain/repositories/userList/AddMovieToUserListRepository";
import { MovieTokens } from "libs/inversifyjs/tokens/movieTokens"; import { UserListTokens } from "libs/inversifyjs/tokens/userListTokens"; import { InfraTokens } from "libs/inversifyjs/tokens/infrastructureTokens";
import { IUseCase } from "business/services/UseCase";
import { IAPIResponse } from "business/services/APIResponse";
import AppError from "business/domain/errors/AppError";
import { MessageCode } from "business/domain/common/MessageCodes";

@injectable()
export class AddMovieToUserList implements IUseCase<Movie, Movie[]> {
  constructor(
    @inject(UserListTokens.IGetUserListRepository)
    private readonly getUserListRepository: IGetUserListRepository,
    @inject(UserListTokens.IAddMovieToUserListRepository)
    private readonly addMovieToUserListRepository: IAddMovieToUserListRepository,
  ) {}

  async execute(movie: Movie): Promise<IAPIResponse<Movie[]> | AppError> {
    const currentList = await this.getUserListRepository.execute();
    if (currentList instanceof AppError) {
      return currentList;
    }
    const alreadyExists = currentList.some((item: Movie) => item.id === movie.id);
    if (alreadyExists) {
      return new AppError(MessageCode.MOVIE_ALREADY_IN_LIST);
    }
    const response = await this.addMovieToUserListRepository.execute(movie);
    if (response instanceof AppError) {
      return response;
    }
    return { data: response, messageCode: MessageCode.MOVIE_ADDED_TO_LIST };
  }
}

