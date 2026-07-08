import { injectable, inject } from "inversify";
import { Movie } from "@/business/domain/models/movie/Movie";
import type { IAddMovieToUserListRepository } from "@/business/domain/repositories/userList/add";
import { UserListTokens } from "libs/inversifyjs/tokens/userListTokens";
import { IUseCase } from "business/services/UseCase";
import { IAPIResponse } from "@/business/domain/common/api-response";
import AppError from "@/business/tools/AppError";

@injectable()
export class AddMovieToUserList implements IUseCase<Movie, Movie[]> {
  constructor(
    @inject(UserListTokens.IAddMovieToUserListRepository)
    private readonly userListRepository: IAddMovieToUserListRepository,
  ) {}

  async execute(movie: Movie): Promise<IAPIResponse<Movie[]> | AppError> {
    return this.userListRepository.execute(movie);
  }
}
