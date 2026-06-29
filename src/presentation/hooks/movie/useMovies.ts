import { useState, useEffect, useCallback } from "react";
import { Movie } from "domain/entities/Movie";
import { container } from "libs/inversifyjs/container";
import { TOKENS } from "libs/inversifyjs/tokens";
import { GetMoviesByCategory } from "domain/useCases/movie/GetMoviesByCategory";
import AppError from "domain/errors/AppError";

export const useMovies = (defaultCategory: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const getMoviesByCategory = container.get<GetMoviesByCategory>(TOKENS.GetMoviesByCategory);

  const fetchMovies = useCallback(
    async (category: string) => {
      try {
        const response = await getMoviesByCategory.execute(category);
        if (response instanceof AppError) {
          setError(response);
        } else {
          setMovies(response.data);
          setError(null);
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [getMoviesByCategory],
  );

  useEffect(() => {
    fetchMovies(defaultCategory);
  }, [defaultCategory, fetchMovies]);

  return { movies, loading, error, changeCategory: fetchMovies };
};
