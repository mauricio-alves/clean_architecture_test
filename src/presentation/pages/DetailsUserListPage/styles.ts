import type { ComponentType } from "react";
import styled from "libs/styled-components";
import { Link, type LinkComponentProps } from "@tanstack/react-router";

export const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  padding: 5px;
  margin: 30px 0;
`;

export const UserListTitle = styled.h3`
  padding-bottom: 20px;
`;

export const BackButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-top: 5px;
  margin-bottom: 30px;
`;

export const ListBackButton = styled(Link as ComponentType<LinkComponentProps<'a'>>)`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.primaryHover};
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
  display: inline-block;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryActive};
  }
`;

export const ListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
  padding: 20px 40px;

  @media (max-width: 1330px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 990px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 675px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 450px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
