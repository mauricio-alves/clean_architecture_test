import styled from "libs/styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #000023;
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
  border: 1px solid ${({ $active }) => ($active ? "#02b0c8" : "#ccc")};
  color: ${({ $active }) => ($active ? "#02b0c8" : "white")};
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.8rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #02b0c8;
    color: #02b0c8;
  }
`;
