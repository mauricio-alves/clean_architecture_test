import notFoundImg from "assets/images/not-found.png";
import { NotFoundContainer, NotFoundImage } from "./styles";
import { useNotFound } from "./hook";

export const NotFound = () => {
  const { t } = useNotFound();

  return (
    <NotFoundContainer>
      <NotFoundImage src={notFoundImg} alt={t("notFound.imageAlt")} />
      <p>{t("notFound.message")}</p>
    </NotFoundContainer>
  );
};
