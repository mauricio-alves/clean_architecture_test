import { useNavigate, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useMovieDetails } from "@/business/query-hooks/movie/queries/use-movie-details";
import { useConfig } from "hooks/use-config";
import { formatDate } from "utils/date";
import { messageCodeToI18nKey } from "utils/message-code-to-i18n-key";

export const useDetailsMovie = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const config = useConfig();
  const { id } = useParams({ from: "/details/$id" });
  const { movie, loading, error } = useMovieDetails(id);
  const baseImgUrl = config.getBaseImgUrl();
  const backdropImgUrl = config.getBackdropImgUrl();

  if (error) {
    navigate({ to: "/" });
  }

  const imgUrl = movie?.backdropPath ? `${backdropImgUrl}/${movie.backdropPath}` : "";

  let formattedDate = "";
  if (movie) {
    const dateResult = formatDate(movie.releaseDate, i18n.language);
    formattedDate = dateResult.error ? String(t(messageCodeToI18nKey[dateResult.error] as any)) : dateResult.value;
  }

  return {
    t,
    movie,
    loading,
    error,
    imgUrl,
    baseImgUrl,
    formattedDate,
  };
};
