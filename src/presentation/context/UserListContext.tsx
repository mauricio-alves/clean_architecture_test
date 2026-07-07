import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Movie } from "domain/entities/Movie";
import { container } from "libs/inversifyjs/container";
import { TOKENS } from "libs/inversifyjs/tokens";
import { GetUserList } from "domain/useCases/userList/GetUserList";
import { AddMovieToUserList } from "domain/useCases/userList/AddMovieToUserList";
import { RemoveMovieFromUserList } from "domain/useCases/userList/RemoveMovieFromUserList";
import { toast } from "react-hot-toast";
import AppError from "domain/errors/AppError";
import { MessageCode } from "domain/common/MessageCodes";

interface UserListContextData {
  userList: Movie[];
  loading: boolean;
  addMovie: (movie: Movie) => Promise<void>;
  removeMovie: (movieId: number) => Promise<void>;
}

const UserListContext = createContext<UserListContextData>({} as UserListContextData);

const messageCodeToKey = {
  [MessageCode.MOVIE_ALREADY_IN_LIST]: "messages.MOVIE_ALREADY_IN_LIST",
  [MessageCode.MOVIE_ADDED_TO_LIST]: "messages.MOVIE_ADDED_TO_LIST",
  [MessageCode.MOVIE_REMOVED_FROM_LIST]: "messages.MOVIE_REMOVED_FROM_LIST",
  [MessageCode.ERROR_ADD_MOVIE]: "messages.ERROR_ADD_MOVIE",
  [MessageCode.ERROR_REMOVE_MOVIE]: "messages.ERROR_REMOVE_MOVIE",
} as const;

type MessageCodeKey = keyof typeof messageCodeToKey;

export const UserListProvider = ({ children }: { children: ReactNode }) => {
  const [userList, setUserList] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const getUserListUseCase = container.get<GetUserList>(TOKENS.IGetUserList);
  const addMovieToUserListUseCase = container.get<AddMovieToUserList>(TOKENS.IAddMovieToUserList);
  const removeMovieFromUserListUseCase = container.get<RemoveMovieFromUserList>(TOKENS.IRemoveMovieFromUserList);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const response = await getUserListUseCase.execute(undefined);
        if (response instanceof AppError) {
          console.error(response.message);
        } else {
          setUserList(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadFavorites();
  }, [getUserListUseCase]);

  const addMovie = useCallback(
    async (movie: Movie) => {
      try {
        const response = await addMovieToUserListUseCase.execute(movie);
        if (response instanceof AppError) {
          toast.error(response.message);
        } else {
          setUserList(response.data);
          if (response.messageCode) {
            toast.success(t(messageCodeToKey[response.messageCode as MessageCodeKey]));
          }
        }
      } catch (error: any) {
        if (error instanceof AppError) {
          toast.error(error.message);
        } else {
          toast.error(t(messageCodeToKey[MessageCode.ERROR_ADD_MOVIE]));
        }
      }
    },
    [addMovieToUserListUseCase, t],
  );

  const removeMovie = useCallback(
    async (movieId: number) => {
      try {
        const response = await removeMovieFromUserListUseCase.execute(movieId);
        if (response instanceof AppError) {
          toast.error(response.message);
        } else {
          setUserList(response.data);
          if (response.messageCode) {
            toast.success(t(messageCodeToKey[response.messageCode as MessageCodeKey]));
          }
        }
      } catch (error: any) {
        if (error instanceof AppError) {
          toast.error(error.message);
        } else {
          toast.error(t(messageCodeToKey[MessageCode.ERROR_REMOVE_MOVIE]));
        }
      }
    },
    [removeMovieFromUserListUseCase, t],
  );

  const value = useMemo(
    () => ({
      userList,
      loading,
      addMovie,
      removeMovie,
    }),
    [userList, loading, addMovie, removeMovie],
  );

  return <UserListContext.Provider value={value}>{children}</UserListContext.Provider>;
};

export const useUserListContext = () => useContext(UserListContext);
