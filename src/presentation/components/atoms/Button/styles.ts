import styled, { css } from "libs/styled-components";

export const StyledButton = styled.button<{ $variant?: "add" | "delete" | "details" }>`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  color: white;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-weight: 500;

  ${({ $variant }) =>
    $variant === "add" &&
    css`
      background-color: #058709;
      &:hover {
        background-color: #1cbb21;
      }
    `}

  ${({ $variant }) =>
    $variant === "delete" &&
    css`
      background-color: #c80202;
      &:hover {
        background-color: #f85d5d;
      }
    `}

  ${({ $variant }) =>
    $variant === "details" &&
    css`
      background-color: #0254c8;
      &:hover {
        background-color: #026cc8;
      }
    `}
`;
