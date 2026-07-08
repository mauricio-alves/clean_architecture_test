import styled from "libs/styled-components";
import { Link } from "@tanstack/react-router";

export const DetailsContainer = styled.div<{ $bgImage: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: ${({ $bgImage }) => ($bgImage ? `url(${$bgImage})` : "none")};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  gap: 2rem;
  padding: 50px 100px;
  min-height: calc(100vh - 160px);

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
  }
`;

export const ImageWrapper = styled.div`
  max-width: 300px;
  width: 100%;
`;

export const MovieImage = styled.img`
  width: 100%;
  border-radius: 10px;
  object-fit: contain;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  padding: 20px 20px;
  border-radius: 10px;
  background: linear-gradient(to bottom right, rgba(31.5, 31.5, 52.5, 1), rgba(31.5, 31.5, 52.5, 0.84));
  opacity: 0.9;
  gap: 10px;
`;

export const GenresList = styled.p`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

export const BackButton = styled(Link)`
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
  text-align: center;
  margin-top: 15px;
  max-width: 200px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryActive};
  }
`;
