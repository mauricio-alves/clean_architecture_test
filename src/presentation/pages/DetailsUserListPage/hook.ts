import { useTranslation } from "react-i18next";
import { useUserList } from "@/business/query-hooks/user-list/queries/use-user-list";
import { useDeleteMovieFromList } from "business/query-hooks/user-list/mutations/use-delete-movie-from-list";
import { useConfig } from "hooks/use-config";
import { formatDate } from "utils/date";
import { messageCodeToI18nKey } from "utils/message-code-to-i18n-key";
import { toast } from "@/presentation/components/atoms/Toast/hook";
import { CodeMessagesEnum } from "@/business/domain/common/enums/code-messages";
import AppError from "@/business/tools/app-error";

export const useDetailsUserList = () => {
  const config = useConfig();
  const baseImgUrl = config.getBaseImgUrl();
  const { userList } = useUserList();
  const { t, i18n } = useTranslation();

  const { deleteMovie } = useDeleteMovieFromList({
    onSuccess: () => {
      toast({
        title: String(t(messageCodeToI18nKey[CodeMessagesEnum.MOVIE_REMOVED_FROM_LIST] as any)),
        variant: "success",
      });
    },
    onError: (error: AppError) => {
      const code = error.code || CodeMessagesEnum.ERROR_REMOVE_MOVIE;
      toast({ title: String(t(messageCodeToI18nKey[code] as any)), variant: "destructive" });
    }
  });

  const handledeleteMovie = (id: number) => {
    deleteMovie(id);
  };

  const getFormattedDate = (releaseDate: string) => {
    const dateResult = formatDate(releaseDate, i18n.language);
    return dateResult.error ? String(t(messageCodeToI18nKey[dateResult.error] as any)) : dateResult.value;
  };

  return {
    t,
    userList,
    baseImgUrl,
    handledeleteMovie,
    getFormattedDate,
  };
};
