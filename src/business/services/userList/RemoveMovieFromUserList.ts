import { injectable, inject } from "inversify";
import { Movie } from "business/domain/models/Movie";
import type { IRemoveMovieFromUserListRepository } from "business/domain/repositories/userList/RemoveMovieFromUserListRepository";
import { MovieTokens } from "libs/inversifyjs/tokens/movieTokens"; import { UserListTokens } from "libs/inversifyjs/tokens/userListTokens"; import { InfraTokens } from "libs/inversifyjs/tokens/infrastructureTokens";
import { IUseCase } from "business/services/UseCase";
import { IAPIResponse } from "business/services/APIResponse";
import AppError from "business/domain/errors/AppError";
import { MessageCode } from "business/domain/common/MessageCodes";

@injectable()
export class RemoveMovieFromUserList implements IUseCase<number, Movie[]> {
  constructor(
    @inject(UserListTokens.IRemoveMovieFromUserListRepository)
    private readonly removeMovieFromUserListRepository: IRemoveMovieFromUserListRepository,
  ) {}

  async execute(movieId: number): Promise<IAPIResponse<Movie[]> | AppError> {
    const response = await this.removeMovieFromUserListRepository.execute(movieId);
    if (response instanceof AppError) {
      return response;
    }
    return { data: response, messageCode: MessageCode.MOVIE_REMOVED_FROM_LIST };
  }
}

