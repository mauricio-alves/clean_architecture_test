import styled from "libs/styled-components";

export const FooterContainer = styled.footer`
  padding: 10px 0;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.dark};
  color: white;
`;

export const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: bold;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;
