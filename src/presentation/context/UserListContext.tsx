import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from "react";
import { Movie } from "domain/entities/Movie";
import { container } from "libs/inversifyjs/container";
import { TOKENS } from "libs/inversifyjs/tokens";
import { GetUserList } from "domain/useCases/userList/GetUserList";
import { AddMovieToUserList } from "domain/useCases/userList/AddMovieToUserList";
import { RemoveMovieFromUserList } from "domain/useCases/userList/RemoveMovieFromUserList";
import { toast } from "react-hot-toast";
import AppError from "domain/errors/AppError";

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

  const getUserListUseCase = container.get<GetUserList>(TOKENS.GetUserList);
  const addMovieToUserListUseCase = container.get<AddMovieToUserList>(TOKENS.AddMovieToUserList);
  const removeMovieFromUserListUseCase = container.get<RemoveMovieFromUserList>(TOKENS.RemoveMovieFromUserList);

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
          toast.error(response.message);
        } else {
          setUserList(response.data);
          toast.success(response.message || "Filme adicionado à sua lista!");
        }
      } catch (error: any) {
        if (error instanceof AppError) {
          toast.error(error.message);
        } else {
          toast.error("Erro ao adicionar filme!");
        }
      }
    },
    [addMovieToUserListUseCase],
  );

  const removeMovie = useCallback(
    async (movieId: number) => {
      try {
        const response = await removeMovieFromUserListUseCase.execute(movieId);
        if (response instanceof AppError) {
          toast.error(response.message);
        } else {
          setUserList(response.data);
          toast.success(response.message || "Filme removido da sua lista!");
        }
      } catch (error: any) {
        if (error instanceof AppError) {
          toast.error(error.message);
        } else {
          toast.error("Erro ao remover filme!");
        }
      }
    },
    [removeMovieFromUserListUseCase],
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
