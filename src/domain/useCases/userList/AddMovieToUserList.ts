import { injectable, inject } from "inversify";
import { Movie } from "domain/entities/Movie";
import type { IGetUserListRepository } from "domain/repositories/userList/GetUserListRepository";
import type { IAddMovieToUserListRepository } from "domain/repositories/userList/AddMovieToUserListRepository";
import { TOKENS } from "libs/inversifyjs/tokens";
import { IUseCase } from "domain/useCases/UseCase";
import { IAPIResponse } from "domain/useCases/APIResponse";
import AppError from "domain/errors/AppError";
import { MessageCode } from "domain/common/MessageCodes";

@injectable()
export class AddMovieToUserList implements IUseCase<Movie, Movie[]> {
  constructor(
    @inject(TOKENS.IGetUserListRepository)
    private readonly getUserListRepository: IGetUserListRepository,
    @inject(TOKENS.IAddMovieToUserListRepository)
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
