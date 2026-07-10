import styled, { css } from "@/libs/styled-components";

export const StyledButton = styled.button<{ $variant?: "add" | "delete" | "details" }>`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  color: white;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-weight: 500;

  ${({ $variant, theme }) =>
    $variant === "add" &&
    css`
      background-color: ${theme.colors.success};
      &:hover {
        background-color: ${theme.colors.successHover};
      }
    `}

  ${({ $variant, theme }) =>
    $variant === "delete" &&
    css`
      background-color: ${theme.colors.danger};
      &:hover {
        background-color: ${theme.colors.dangerHover};
      }
    `}

  ${({ $variant, theme }) =>
    $variant === "details" &&
    css`
      background-color: ${theme.colors.primaryHover};
      &:hover {
        background-color: ${theme.colors.primaryActive};
      }
    `}
`;
