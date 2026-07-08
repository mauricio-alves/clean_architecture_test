import styled from "libs/styled-components";

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const SearchForm = styled.form`
  display: flex;
`;

export const SearchInput = styled.input`
  padding: 3px 10px;
  width: 250px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.primary};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SearchError = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 12px;
  margin-top: -15px;
  margin-bottom: 15px;
`;
