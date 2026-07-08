import { FooterContainer, FooterLink } from "./styles";
import { useFooter } from "./hook";

export const Footer = () => {
  const { t } = useFooter();

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
