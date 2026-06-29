import { injectable, inject } from "inversify";
import { Movie } from "domain/entities/Movie";
import type { IUserListRepository } from "domain/repositories/userList/IUserListRepository";
import { TOKENS } from "libs/inversifyjs/tokens";

@injectable()
export class GetUserList {
  constructor(
    @inject(TOKENS.IUserListRepository)
    private readonly userListRepository: IUserListRepository
  ) {}

  public execute(): Promise<Movie[]> {
    return this.userListRepository.getUserList();
  }
}
