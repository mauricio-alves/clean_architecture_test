import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { container } from "@/libs/inversifyjs/container";
import { MovieTokens } from "@/libs/inversifyjs/tokens/movie-tokens";
import type { IGetMoviesByCategoryUseCase } from "@/business/domain/services/movie/get-movies-by-category";
import type { MovieCategoryEnum } from "@/business/domain/common/enums/movie-category";
import AppError from "@/business/tools/app-error";

export const useMovies = (defaultCategory: MovieCategoryEnum) => {
  const [category, setCategory] = useState(defaultCategory);
  const getMoviesByCategory = container.get<IGetMoviesByCategoryUseCase>(MovieTokens.IGetMoviesByCategory);

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
    changeCategory: (newCategory: MovieCategoryEnum) => setCategory(newCategory),
  };
};
