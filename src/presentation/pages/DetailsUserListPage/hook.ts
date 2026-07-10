import { useTranslation } from "react-i18next";
import { useUserList } from "@/business/query-hooks/user-list/queries/use-user-list";

export const useDetailsUserList = () => {
  const { t } = useTranslation();
  const { userList } = useUserList();

  return {
    t,
    userList,
  };
};
