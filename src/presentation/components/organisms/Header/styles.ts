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
