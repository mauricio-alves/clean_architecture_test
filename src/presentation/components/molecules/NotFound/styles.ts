import styled from "libs/styled-components";

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 20px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const NotFoundImage = styled.img`
  width: 250px;
  padding-bottom: 10px;
`;
