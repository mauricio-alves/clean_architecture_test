import { IGetUserListUseCase } from "@/business/domain/services/user-list/get-user-list";
import { injectable, inject } from "inversify";
import type { IGetUserListRepository } from "@/business/domain/repositories/user-list/get";
import { UserListTokens } from "@/libs/inversifyjs/tokens/user-list-tokens";
import { MovieMapper } from "@/business/mappers/movie-mapper";
import AppError from "@/business/tools/app-error";

@injectable()
export class GetUserList implements IGetUserListUseCase {
  constructor(
    @inject(UserListTokens.IGetUserListRepository)
    private readonly userListRepository: IGetUserListRepository,
  ) {}

  async execute() {
    const response = await this.userListRepository.execute();
    if (response instanceof AppError) {
      return response;
    }
    return {
      ...response,
      data: MovieMapper.toEntityList(response.data),
    };
  }
}
