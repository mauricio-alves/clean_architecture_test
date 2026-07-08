import { ContainerModule } from "inversify";
import { UserListTokens } from "libs/inversifyjs/tokens/userListTokens";

import type { IGetUserListRepository } from "business/domain/repositories/userList/GetUserListRepository";
import type { IAddMovieToUserListRepository } from "business/domain/repositories/userList/AddMovieToUserListRepository";
import type { IRemoveMovieFromUserListRepository } from "business/domain/repositories/userList/RemoveMovieFromUserListRepository";

import { GetUserListRepositoryImpl } from "infrastructure/repositories/userList/GetUserListRepositoryImpl";
import { AddMovieToUserListRepositoryImpl } from "infrastructure/repositories/userList/AddMovieToUserListRepositoryImpl";
import { RemoveMovieFromUserListRepositoryImpl } from "infrastructure/repositories/userList/RemoveMovieFromUserListRepositoryImpl";

import { GetUserList } from "business/services/userList/GetUserList";
import { AddMovieToUserList } from "business/services/userList/AddMovieToUserList";
import { RemoveMovieFromUserList } from "business/services/userList/RemoveMovieFromUserList";

export const userListModule = new ContainerModule(({ bind }) => {
  bind<IGetUserListRepository>(UserListTokens.IGetUserListRepository).to(GetUserListRepositoryImpl);
  bind<IAddMovieToUserListRepository>(UserListTokens.IAddMovieToUserListRepository).to(AddMovieToUserListRepositoryImpl);
  bind<IRemoveMovieFromUserListRepository>(UserListTokens.IRemoveMovieFromUserListRepository).to(RemoveMovieFromUserListRepositoryImpl);

  bind<GetUserList>(UserListTokens.IGetUserList).to(GetUserList);
  bind<AddMovieToUserList>(UserListTokens.IAddMovieToUserList).to(AddMovieToUserList);
  bind<RemoveMovieFromUserList>(UserListTokens.IRemoveMovieFromUserList).to(RemoveMovieFromUserList);
});
