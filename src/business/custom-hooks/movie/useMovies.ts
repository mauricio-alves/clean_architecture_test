import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { container } from "libs/inversifyjs/container";
import { MovieTokens } from "libs/inversifyjs/tokens/movieTokens"; import { UserListTokens } from "libs/inversifyjs/tokens/userListTokens"; import { InfraTokens } from "libs/inversifyjs/tokens/infrastructureTokens";
import { GetMoviesByCategory } from "business/services/movie/GetMoviesByCategory";
import AppError from "business/domain/errors/AppError";

export const useMovies = (defaultCategory: string) => {
  const [category, setCategory] = useState(defaultCategory);
  const getMoviesByCategory = container.get<GetMoviesByCategory>(MovieTokens.IGetMoviesByCategory);

  const { data, isLoading, error } = useQuery({
    queryKey: ["movies", category],
    queryFn: async () => {
      const response = await getMoviesByCategory.execute(category);
      if (response instanceof AppError) {
        throw response;
      }
      return response.data;
    },
  });

  return {
    movies: data ?? [],
    loading: isLoading,
    error,
    changeCategory: (newCategory: string) => setCategory(newCategory),
  };
};

