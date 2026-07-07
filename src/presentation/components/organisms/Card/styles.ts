import styled from "libs/styled-components";
import { Link } from "@tanstack/react-router";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #02b0c8;
  border: 1px solid #ccc;
  border-radius: 10px;
  max-width: 300px;
  padding-bottom: 10px;
  background-color: #ffffff;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  object-fit: contain;
  padding-bottom: 10px;
  border-radius: 10px 10px 0 0;
`;

export const CardTitle = styled.p`
  padding: 0 10px;
  margin-bottom: 5px;
`;

export const CardInfo = styled.p`
  font-size: 0.9rem;
  color: #555555;
  margin-bottom: 5px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-top: 10px;
`;

export const DetailButton = styled(Link)`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #0254c8;
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
  display: inline-flex;
  align-items: center;

  &:hover {
    background-color: #026cc8;
  }
`;
