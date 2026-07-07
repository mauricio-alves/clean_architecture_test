import { injectable, inject } from "inversify";
import { Movie } from "domain/entities/Movie";
import type { IGetUserListRepository } from "domain/repositories/userList/IGetUserListRepository";
import { TOKENS } from "libs/inversifyjs/tokens";
import { IUseCase } from "domain/useCases/IUseCase";
import { IAPIResponse } from "domain/useCases/IAPIResponse";
import AppError from "domain/errors/AppError";

@injectable()
export class GetUserList implements IUseCase<void, Movie[]> {
  constructor(
    @inject(TOKENS.IGetUserListRepository)
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
