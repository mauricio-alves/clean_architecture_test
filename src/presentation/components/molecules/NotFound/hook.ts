import { useTranslation } from "react-i18next";

export const useNotFound = () => {
  const { t } = useTranslation();
  return { t };
};
