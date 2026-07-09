import { ContainerModule } from "inversify";
import { UserListTokens } from "libs/inversifyjs/tokens/user-list-tokens";

import type { IGetUserListRepository } from "@/business/domain/repositories/user-list/get";
import type { ICreateMovieInUserListRepository } from "@/business/domain/repositories/user-list/create";
import type { IDeleteMovieFromUserListRepository } from "@/business/domain/repositories/user-list/delete";

import { GetUserListRepositoryImpl } from "infrastructure/repositories/user-list/get-user-list";
import { CreateMovieInUserListRepositoryImpl } from "infrastructure/repositories/user-list/create-movie-in-user-list";
import { DeleteMovieFromUserListRepositoryImpl } from "infrastructure/repositories/user-list/delete-movie-from-user-list";

import { GetUserList } from "business/services/user-list/get-user-list";
import type { IGetUserListUseCase } from "@/business/domain/services/user-list/get-user-list";
import { CreateMovieInUserList } from "business/services/user-list/create-movie-in-user-list";
import type { ICreateMovieInUserListUseCase } from "@/business/domain/services/user-list/create-movie-in-user-list";
import { DeleteMovieFromUserList } from "business/services/user-list/delete-movie-from-user-list";
import type { IDeleteMovieFromUserListUseCase } from "@/business/domain/services/user-list/delete-movie-from-user-list";

export const userListModule = new ContainerModule(({ bind }) => {
  bind<IGetUserListRepository>(UserListTokens.IGetUserListRepository).to(GetUserListRepositoryImpl);
  bind<ICreateMovieInUserListRepository>(UserListTokens.ICreateMovieInUserListRepository).to(CreateMovieInUserListRepositoryImpl);
  bind<IDeleteMovieFromUserListRepository>(UserListTokens.IDeleteMovieFromUserListRepository).to(DeleteMovieFromUserListRepositoryImpl);

  bind<IGetUserListUseCase>(UserListTokens.IGetUserList).to(GetUserList);
  bind<ICreateMovieInUserListUseCase>(UserListTokens.ICreateMovieInUserList).to(CreateMovieInUserList);
  bind<IDeleteMovieFromUserListUseCase>(UserListTokens.IDeleteMovieFromUserList).to(DeleteMovieFromUserList);
});
