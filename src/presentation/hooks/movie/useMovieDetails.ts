import { useState, useEffect } from "react";
import { Movie } from "domain/entities/Movie";
import { container } from "libs/inversifyjs/container";
import { TOKENS } from "libs/inversifyjs/tokens";
import { GetMovieDetails } from "domain/useCases/movie/GetMovieDetails";

export const useMovieDetails = (id: string | undefined) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const getMovieDetails = container.get<GetMovieDetails>(TOKENS.GetMovieDetails);

  useEffect(() => {
    if (!id) {
      return;
    }
    async function fetchDetails() {
      try {
        const data = await getMovieDetails.execute(id!);
        setMovie(data);
        setError(null);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [id, getMovieDetails]);

  return { movie, loading, error };
};
