import { injectable, inject } from "inversify";
import { Movie } from "domain/entities/Movie";
import type { IUserListRepository } from "domain/repositories/userList/IUserListRepository";
import { TOKENS } from "libs/inversifyjs/tokens";

@injectable()
export class AddMovieToUserList {
  constructor(
    @inject(TOKENS.IUserListRepository)
    private readonly userListRepository: IUserListRepository
  ) {}

  public async execute(movie: Movie): Promise<Movie[]> {
    const currentList = await this.userListRepository.getUserList();
    const alreadyExists = currentList.some((item) => item.id === movie.id);
    if (alreadyExists) {
      throw new Error("Filme já está na sua lista!");
    }
    return this.userListRepository.addMovie(movie);
  }
}
