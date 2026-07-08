import { useQuery } from "@tanstack/react-query";
import { container } from "libs/inversifyjs/container";
import { MovieTokens } from "libs/inversifyjs/tokens/movieTokens";
import { GetMovieDetails } from "business/services/movie/GetMovieDetails";
import AppError from "@/business/tools/AppError";

export const useMovieDetails = (id: string | undefined) => {
  const getMovieDetails = container.get<GetMovieDetails>(MovieTokens.IGetMovieDetails);

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
