import { IDeleteMovieFromUserListUseCase } from "@/business/domain/services/user-list/delete-movie-from-user-list";
import { injectable, inject } from "inversify";
import type { IDeleteMovieFromUserListRepository } from "@/business/domain/repositories/user-list/delete";
import { UserListTokens } from "@/libs/inversifyjs/tokens/user-list-tokens";
import { MovieMapper } from "@/business/mappers/movie-mapper";
import AppError from "@/business/tools/app-error";

@injectable()
export class DeleteMovieFromUserList implements IDeleteMovieFromUserListUseCase {
  constructor(
    @inject(UserListTokens.IDeleteMovieFromUserListRepository)
    private readonly userListRepository: IDeleteMovieFromUserListRepository,
  ) {}

  async execute(id: string) {
    const response = await this.userListRepository.execute(id);
    if (response instanceof AppError) {
      return response;
    }
    return {
      ...response,
      data: MovieMapper.toEntityList(response.data),
    };
  }
}
