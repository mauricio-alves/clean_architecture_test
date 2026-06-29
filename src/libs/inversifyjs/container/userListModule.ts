import { ContainerModule } from "inversify";
import { TOKENS } from "libs/inversifyjs/tokens";

import type { IUserListRepository } from "domain/repositories/userList/IUserListRepository";
import { UserListRepositoryImpl } from "data/repositories/userList/UserListRepositoryImpl";

import { GetUserList } from "domain/useCases/userList/GetUserList";
import { AddMovieToUserList } from "domain/useCases/userList/AddMovieToUserList";
import { RemoveMovieFromUserList } from "domain/useCases/userList/RemoveMovieFromUserList";

export const userListModule = new ContainerModule(({ bind }) => {
  bind<IUserListRepository>(TOKENS.IUserListRepository).to(UserListRepositoryImpl);

  bind<GetUserList>(TOKENS.GetUserList).to(GetUserList);
  bind<AddMovieToUserList>(TOKENS.AddMovieToUserList).to(AddMovieToUserList);
  bind<RemoveMovieFromUserList>(TOKENS.RemoveMovieFromUserList).to(RemoveMovieFromUserList);
});
