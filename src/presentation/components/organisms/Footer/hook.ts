import { useTranslation } from "react-i18next";

export const useFooter = () => {
  const { t } = useTranslation();
  return { t };
};
