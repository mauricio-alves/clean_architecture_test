import styled from "libs/styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dark};
  color: white;
  padding: 20px 0;

  @media (max-width: 450px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const LogoImage = styled.img`
  max-width: 150px;
  filter: brightness(0) invert(1);

  @media (max-width: 450px) {
    display: none;
  }
`;

export const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  display: flex;
  align-items: baseline;
  align-self: center;
  justify-content: center;
  text-align: center;
`;

export const LanguageSelector = styled.div`
  display: flex;
  gap: 10px;
`;

export const LanguageButton = styled.button<{ $active: boolean }>`
  background: transparent;
  border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.border)};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : "white")};
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.8rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;
