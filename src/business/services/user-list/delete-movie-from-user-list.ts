import { IDeleteMovieFromUserListUseCase } from "@/business/domain/services/user-list/delete-movie-from-user-list";
import { injectable, inject } from "inversify";
import type { IDeleteMovieFromUserListRepository } from "@/business/domain/repositories/user-list/delete";
import { UserListTokens } from "libs/inversifyjs/tokens/user-list-tokens";

@injectable()
export class DeleteMovieFromUserList implements IDeleteMovieFromUserListUseCase {
  constructor(
    @inject(UserListTokens.IDeleteMovieFromUserListRepository)
    private readonly userListRepository: IDeleteMovieFromUserListRepository,
  ) {}

  async execute(id: string) {
    return this.userListRepository.execute(id);
  }
}
