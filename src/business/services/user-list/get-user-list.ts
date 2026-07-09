import { IGetUserListUseCase } from "@/business/domain/services/user-list/get-user-list";
import { injectable, inject } from "inversify";
import type { IGetUserListRepository } from "@/business/domain/repositories/user-list/get";
import { UserListTokens } from "libs/inversifyjs/tokens/user-list-tokens";

@injectable()
export class GetUserList implements IGetUserListUseCase {
  constructor(
    @inject(UserListTokens.IGetUserListRepository)
    private readonly userListRepository: IGetUserListRepository,
  ) {}

  async execute() {
    return this.userListRepository.execute();
  }
}
