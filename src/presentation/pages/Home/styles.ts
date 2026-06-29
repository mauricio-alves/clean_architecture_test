import styled from "libs/styled-components";
import { Link } from "react-router-dom";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #02b0c8;
`;

export const HomeTitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding-top: 30px;
`;

export const CategorySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 20px 0;
`;

export const CategoryList = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
  cursor: pointer;
  padding: 0;
`;

export const CategoryItem = styled.li`
  background-color: #02b0c8;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  transition: all 0.3s ease-in-out;
  font-weight: 500;

  &:hover {
    background-color: #0254c8;
  }
`;

export const MiniUserList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  color: #02b0c8;
  max-width: 250px;
  padding: 0;
  margin: 30px 0 10px 0;
  gap: 1rem;
`;

export const MiniUserListImage = styled.img`
  width: 80px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
`;

export const MiniUserListLink = styled(Link)`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #0254c8;
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
  display: inline-block;
  margin-top: 5px;

  &:hover {
    background-color: #026cc8;
  }
`;

export const MainContent = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const ResultsGrid = styled.div`
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
