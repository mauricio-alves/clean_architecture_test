import { injectable, inject } from "inversify";
import { Movie } from "@/business/domain/models/movie/Movie";
import type { IGetUserListRepository } from "@/business/domain/repositories/userList/get";
import { UserListTokens } from "libs/inversifyjs/tokens/userListTokens";
import { IUseCase } from "business/services/UseCase";
import { IAPIResponse } from "@/business/domain/common/api-response";
import AppError from "@/business/tools/AppError";

@injectable()
export class GetUserList implements IUseCase<void, Movie[]> {
  constructor(
    @inject(UserListTokens.IGetUserListRepository)
    private readonly userListRepository: IGetUserListRepository,
  ) {}

  async execute(): Promise<IAPIResponse<Movie[]> | AppError> {
    return this.userListRepository.execute();
  }
}
