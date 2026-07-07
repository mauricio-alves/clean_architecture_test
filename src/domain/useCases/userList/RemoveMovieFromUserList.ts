import { injectable, inject } from "inversify";
import { Movie } from "domain/entities/Movie";
import type { IRemoveMovieFromUserListRepository } from "domain/repositories/userList/IRemoveMovieFromUserListRepository";
import { TOKENS } from "libs/inversifyjs/tokens";
import { IUseCase } from "domain/useCases/IUseCase";
import { IAPIResponse } from "domain/useCases/IAPIResponse";
import AppError from "domain/errors/AppError";
import { MessageCode } from "domain/common/MessageCodes";

@injectable()
export class RemoveMovieFromUserList implements IUseCase<number, Movie[]> {
  constructor(
    @inject(TOKENS.IRemoveMovieFromUserListRepository)
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
