import { FooterContainer, FooterLink } from "./styles";

export const Footer = () => {
  return (
    <FooterContainer>
      <p>
        Desenvolvido por{" "}
        <FooterLink href="https://github.com/mauricio-alves" target="_blank" rel="noreferrer">
          Maurício Alves
        </FooterLink>
      </p>
    </FooterContainer>
  );
};
