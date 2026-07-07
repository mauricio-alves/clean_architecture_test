import { ContainerModule } from "inversify";
import { TOKENS } from "libs/inversifyjs/tokens";

import type { IGetUserListRepository } from "domain/repositories/userList/GetUserListRepository";
import type { IAddMovieToUserListRepository } from "domain/repositories/userList/AddMovieToUserListRepository";
import type { IRemoveMovieFromUserListRepository } from "domain/repositories/userList/RemoveMovieFromUserListRepository";

import { GetUserListRepositoryImpl } from "data/repositories/userList/GetUserListRepositoryImpl";
import { AddMovieToUserListRepositoryImpl } from "data/repositories/userList/AddMovieToUserListRepositoryImpl";
import { RemoveMovieFromUserListRepositoryImpl } from "data/repositories/userList/RemoveMovieFromUserListRepositoryImpl";

import { GetUserList } from "domain/useCases/userList/GetUserList";
import { AddMovieToUserList } from "domain/useCases/userList/AddMovieToUserList";
import { RemoveMovieFromUserList } from "domain/useCases/userList/RemoveMovieFromUserList";

export const userListModule = new ContainerModule(({ bind }) => {
  bind<IGetUserListRepository>(TOKENS.IGetUserListRepository).to(GetUserListRepositoryImpl);
  bind<IAddMovieToUserListRepository>(TOKENS.IAddMovieToUserListRepository).to(AddMovieToUserListRepositoryImpl);
  bind<IRemoveMovieFromUserListRepository>(TOKENS.IRemoveMovieFromUserListRepository).to(RemoveMovieFromUserListRepositoryImpl);

  bind<GetUserList>(TOKENS.IGetUserList).to(GetUserList);
  bind<AddMovieToUserList>(TOKENS.IAddMovieToUserList).to(AddMovieToUserList);
  bind<RemoveMovieFromUserList>(TOKENS.IRemoveMovieFromUserList).to(RemoveMovieFromUserList);
});
