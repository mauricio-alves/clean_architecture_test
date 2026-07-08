import { useTranslation } from "react-i18next";
import { useUserList } from "business/custom-hooks/userList/useUserList";
import { useConfig } from "hooks/useConfig";
import { formatDate } from "utils/date";
import { messageCodeToI18nKey } from "utils/messageCodeToI18nKey";

export const useDetailsUserList = () => {
  const config = useConfig();
  const baseImgUrl = config.getBaseImgUrl();
  const { userList, removeMovie } = useUserList();
  const { t, i18n } = useTranslation();

  const handleRemoveMovie = async (id: number) => {
    await removeMovie(id);
  };

  const getFormattedDate = (releaseDate: string) => {
    const dateResult = formatDate(releaseDate, i18n.language);
    return dateResult.error ? t(messageCodeToI18nKey[dateResult.error]) : dateResult.value;
  };

  return {
    t,
    userList,
    baseImgUrl,
    handleRemoveMovie,
    getFormattedDate
  };
};
