import { injectable, inject } from "inversify";
import { Movie } from "@/business/domain/models/movie/Movie";
import type { IRemoveMovieFromUserListRepository } from "@/business/domain/repositories/userList/remove";
import { UserListTokens } from "libs/inversifyjs/tokens/userListTokens";
import { IUseCase } from "business/services/UseCase";
import { IAPIResponse } from "@/business/domain/common/api-response";
import AppError from "@/business/tools/AppError";

@injectable()
export class RemoveMovieFromUserList implements IUseCase<string, Movie[]> {
  constructor(
    @inject(UserListTokens.IRemoveMovieFromUserListRepository)
    private readonly userListRepository: IRemoveMovieFromUserListRepository,
  ) {}

  async execute(id: string): Promise<IAPIResponse<Movie[]> | AppError> {
    return this.userListRepository.execute(id);
  }
}
