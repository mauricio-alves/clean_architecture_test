import styled from "libs/styled-components";

export const FooterContainer = styled.footer`
  padding: 10px 0;
  text-align: center;
  background-color: #000023;
  color: white;
`;

export const FooterLink = styled.a`
  color: #02b0c8;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #0254c8;
  }
`;
