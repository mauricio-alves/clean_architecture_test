import { injectable, inject } from "inversify";
import { Movie } from "domain/entities/Movie";
import type { IUserListRepository } from "domain/repositories/userList/IUserListRepository";
import { TOKENS } from "libs/inversifyjs/tokens";

@injectable()
export class RemoveMovieFromUserList {
  constructor(
    @inject(TOKENS.IUserListRepository)
    private readonly userListRepository: IUserListRepository
  ) {}

  public execute(movieId: number): Promise<Movie[]> {
    return this.userListRepository.removeMovie(movieId);
  }
}
