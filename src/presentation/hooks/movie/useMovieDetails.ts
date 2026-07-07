import { useQuery } from "@tanstack/react-query";
import { container } from "libs/inversifyjs/container";
import { TOKENS } from "libs/inversifyjs/tokens";
import { GetMovieDetails } from "domain/useCases/movie/GetMovieDetails";
import AppError from "domain/errors/AppError";

export const useMovieDetails = (id: string | undefined) => {
  const getMovieDetails = container.get<GetMovieDetails>(TOKENS.IGetMovieDetails);

  const { data, isLoading, error } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: async () => {
      const response = await getMovieDetails.execute(id!);
      if (response instanceof AppError) {
        throw response;
      }
      return response.data;
    },
    enabled: !!id,
  });

  return {
    movie: data ?? null,
    loading: isLoading,
    error,
  };
};
