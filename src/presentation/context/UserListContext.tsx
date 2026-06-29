import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Movie } from "domain/entities/Movie";
import { container } from "libs/inversifyjs/container";
import { TOKENS } from "libs/inversifyjs/tokens";
import { GetUserList } from "domain/useCases/userList/GetUserList";
import { AddMovieToUserList } from "domain/useCases/userList/AddMovieToUserList";
import { RemoveMovieFromUserList } from "domain/useCases/userList/RemoveMovieFromUserList";
import { toast } from "react-hot-toast";

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
        const list = await getUserListUseCase.execute();
        setUserList(list);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadFavorites();
  }, [getUserListUseCase]);

  const addMovie = async (movie: Movie) => {
    try {
      const updatedList = await addMovieToUserListUseCase.execute(movie);
      setUserList(updatedList);
      toast.success("Filme adicionado à sua lista!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao adicionar filme!");
    }
  };

  const removeMovie = async (movieId: number) => {
    try {
      const updatedList = await removeMovieFromUserListUseCase.execute(movieId);
      setUserList(updatedList);
      toast.error("Filme removido da sua lista!");
    } catch (error: any) {
      toast.error("Erro ao remover filme!");
    }
  };

  return (
    <UserListContext.Provider value={{ userList, loading, addMovie, removeMovie }}>
      {children}
    </UserListContext.Provider>
  );
};

export const useUserListContext = () => useContext(UserListContext);
