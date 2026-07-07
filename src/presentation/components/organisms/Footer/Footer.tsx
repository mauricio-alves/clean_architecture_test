import { useTranslation } from "react-i18next";
import { FooterContainer, FooterLink } from "./styles";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterContainer>
      <p>
        {t("footer.credits")}{" "}
        <FooterLink href="https://github.com/mauricio-alves" target="_blank" rel="noreferrer">
          Maurício Alves
        </FooterLink>
      </p>
    </FooterContainer>
  );
};
