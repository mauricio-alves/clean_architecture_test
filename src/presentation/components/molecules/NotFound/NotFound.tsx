import { useTranslation } from "react-i18next";
import notFoundImg from "assets/images/not-found.png";
import { NotFoundContainer, NotFoundImage } from "./styles";

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <NotFoundContainer>
      <NotFoundImage src={notFoundImg} alt={t("notFound.imageAlt")} />
      <p>{t("notFound.message")}</p>
    </NotFoundContainer>
  );
};
