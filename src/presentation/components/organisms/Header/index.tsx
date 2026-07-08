import { HeaderContainer, LogoImage, HeaderTitle, LanguageSelector, LanguageButton } from "./styles";
import { useHeader } from "./hook";

export const Header = () => {
  const { t, i18n, changeLanguage } = useHeader();

  return (
    <HeaderContainer>
      <a href="/">
        <LogoImage
          src="https://api-organizer.italents.com.br/portal/uploads/customer/5e26eafb-5f93-43da-a3e0-e991e3a439e5/upload/Logo_italents_padrao_horizontal_1685713962770.png"
          alt="italents logo"
        />
      </a>
      <HeaderTitle>{t("header.title")}</HeaderTitle>
      <LanguageSelector>
        <LanguageButton $active={i18n.language === "pt"} onClick={() => changeLanguage("pt")}>
          PT
        </LanguageButton>
        <LanguageButton $active={i18n.language === "en"} onClick={() => changeLanguage("en")}>
          EN
        </LanguageButton>
      </LanguageSelector>
    </HeaderContainer>
  );
};
