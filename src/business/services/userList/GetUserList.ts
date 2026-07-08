import { injectable, inject } from "inversify";
import { Movie } from "business/domain/models/Movie";
import type { IGetUserListRepository } from "business/domain/repositories/userList/GetUserListRepository";
import { MovieTokens } from "libs/inversifyjs/tokens/movieTokens"; import { UserListTokens } from "libs/inversifyjs/tokens/userListTokens"; import { InfraTokens } from "libs/inversifyjs/tokens/infrastructureTokens";
import { IUseCase } from "business/services/UseCase";
import { IAPIResponse } from "business/services/APIResponse";
import AppError from "business/domain/errors/AppError";

@injectable()
export class GetUserList implements IUseCase<void, Movie[]> {
  constructor(
    @inject(UserListTokens.IGetUserListRepository)
    private readonly getUserListRepository: IGetUserListRepository,
  ) {}

  async execute(_input: void): Promise<IAPIResponse<Movie[]> | AppError> {
    const response = await this.getUserListRepository.execute();
    if (response instanceof AppError) {
      return response;
    }
    return { data: response };
  }
}

