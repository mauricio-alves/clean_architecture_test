import { useTranslation } from "react-i18next";
import { Movie } from "@/business/domain/models/movie/Movie";
import { useUserList } from "business/custom-hooks/userList/useUserList";
import { useConfig } from "hooks/useConfig";
import { formatDate } from "utils/date";
import { messageCodeToI18nKey } from "utils/messageCodeToI18nKey";

export const useCard = (movie: Movie) => {
  const config = useConfig();
  const baseImgUrl = config.getBaseImgUrl();
  const { addMovie } = useUserList();
  const { t, i18n } = useTranslation();

  const handleAddMovie = async () => {
    await addMovie(movie);
  };

  const dateResult = formatDate(movie.releaseDate, i18n.language);
  const formattedDate = dateResult.error ? String(t(messageCodeToI18nKey[dateResult.error] as any)) : dateResult.value;

  return {
    baseImgUrl,
    t,
    handleAddMovie,
    formattedDate,
  };
};


