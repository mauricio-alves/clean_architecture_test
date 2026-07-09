import { useTranslation } from "react-i18next";
import { Movie } from "@/business/domain/models/movie/movie";
import { useCreateMovieInList } from "business/query-hooks/user-list/mutations/use-create-movie-in-list";
import { useConfig } from "hooks/use-config";
import { formatDate } from "utils/date";
import { messageCodeToI18nKey } from "utils/message-code-to-i18n-key";
import { toast } from "@/presentation/components/atoms/Toast/hook";
import { CodeMessagesEnum } from "@/business/domain/common/enums/code-messages";
import AppError from "@/business/tools/app-error";

export const useCard = (movie: Movie) => {
  const config = useConfig();
  const baseImgUrl = config.getBaseImgUrl();
  const { t, i18n } = useTranslation();

  const { createMovie } = useCreateMovieInList({
    onSuccess: () => {
      toast({
        title: String(t(messageCodeToI18nKey[CodeMessagesEnum.MOVIE_ADDED_TO_LIST] as any)),
        variant: "success",
      });
    },
    onError: (error: AppError) => {
      const code = error.code || CodeMessagesEnum.ERROR_ADD_MOVIE;
      toast({ title: String(t(messageCodeToI18nKey[code] as any)), variant: "destructive" });
    }
  });

  const handlecreateMovie = () => {
    createMovie(movie);
  };

  const dateResult = formatDate(movie.releaseDate, i18n.language);
  const formattedDate = dateResult.error ? String(t(messageCodeToI18nKey[dateResult.error] as any)) : dateResult.value;

  return {
    baseImgUrl,
    t,
    handlecreateMovie,
    formattedDate,
  };
};


