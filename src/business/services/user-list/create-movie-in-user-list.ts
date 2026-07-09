import { ICreateMovieInUserListUseCase } from "@/business/domain/services/user-list/create-movie-in-user-list";
import { injectable, inject } from "inversify";
import { Movie } from "@/business/domain/models/movie/movie";
import type { ICreateMovieInUserListRepository } from "@/business/domain/repositories/user-list/create";
import { UserListTokens } from "libs/inversifyjs/tokens/user-list-tokens";

@injectable()
export class CreateMovieInUserList implements ICreateMovieInUserListUseCase {
  constructor(
    @inject(UserListTokens.ICreateMovieInUserListRepository)
    private readonly userListRepository: ICreateMovieInUserListRepository,
  ) {}

  async execute(movie: Movie) {
    return this.userListRepository.execute(movie);
  }
}
