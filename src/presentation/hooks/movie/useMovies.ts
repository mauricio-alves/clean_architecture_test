import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { container } from "libs/inversifyjs/container";
import { TOKENS } from "libs/inversifyjs/tokens";
import { GetMoviesByCategory } from "domain/useCases/movie/GetMoviesByCategory";
import AppError from "domain/errors/AppError";

export const useMovies = (defaultCategory: string) => {
  const [category, setCategory] = useState(defaultCategory);
  const getMoviesByCategory = container.get<GetMoviesByCategory>(TOKENS.IGetMoviesByCategory);

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
