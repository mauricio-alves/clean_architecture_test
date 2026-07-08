import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Movie } from "@/business/domain/models/movie/Movie";
import { container } from "libs/inversifyjs/container";
import { UserListTokens } from "libs/inversifyjs/tokens/userListTokens";
import { GetUserList } from "business/services/userList/GetUserList";
import { AddMovieToUserList } from "business/services/userList/AddMovieToUserList";
import { RemoveMovieFromUserList } from "business/services/userList/RemoveMovieFromUserList";
import { toast } from "react-hot-toast";
import AppError from "@/business/tools/AppError";
import { CodeMessagesEnum } from "@/business/domain/common/enums/code-messages";
import { messageCodeToI18nKey } from "utils/messageCodeToI18nKey";

interface UserListContextData {
  userList: Movie[];
  loading: boolean;
  addMovie: (movie: Movie) => Promise<void>;
  removeMovie: (movieId: number) => Promise<void>;
}

const UserListContext = createContext<UserListContextData>({} as UserListContextData);

export const UserListProvider = ({ children }: { children: ReactNode }) => {
  const [userList, setUserList] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const getUserListUseCase = container.get<GetUserList>(UserListTokens.IGetUserList);
  const addMovieToUserListUseCase = container.get<AddMovieToUserList>(UserListTokens.IAddMovieToUserList);
  const removeMovieFromUserListUseCase = container.get<RemoveMovieFromUserList>(UserListTokens.IRemoveMovieFromUserList);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const response = await getUserListUseCase.execute();
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
          toast.error(String(t(messageCodeToI18nKey[response.code] as any)));
        } else {
          setUserList(response.data);
          toast.success(String(t(messageCodeToI18nKey[CodeMessagesEnum.MOVIE_ADDED_TO_LIST] as any)));
        }
      } catch (error: any) {
        if (error instanceof AppError) {
          toast.error(String(t(messageCodeToI18nKey[error.code] as any)));
        } else {
          toast.error(String(t(messageCodeToI18nKey[CodeMessagesEnum.ERROR_ADD_MOVIE] as any)));
        }
      }
    },
    [addMovieToUserListUseCase, t],
  );

  const removeMovie = useCallback(
    async (movieId: number) => {
      try {
        const response = await removeMovieFromUserListUseCase.execute(movieId.toString());
        if (response instanceof AppError) {
          toast.error(String(t(messageCodeToI18nKey[response.code] as any)));
        } else {
          setUserList(response.data);
          toast.success(String(t(messageCodeToI18nKey[CodeMessagesEnum.MOVIE_REMOVED_FROM_LIST] as any)));
        }
      } catch (error: any) {
        if (error instanceof AppError) {
          toast.error(String(t(messageCodeToI18nKey[error.code] as any)));
        } else {
          toast.error(String(t(messageCodeToI18nKey[CodeMessagesEnum.ERROR_REMOVE_MOVIE] as any)));
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


