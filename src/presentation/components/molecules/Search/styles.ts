import styled from "libs/styled-components";

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const SearchForm = styled.form`
  display: flex;
`;

export const SearchInput = styled.input`
  padding: 3px 10px;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-bottom: 20px;
  color: #02b0c8;
  outline: none;

  &::placeholder {
    color: #02b0c8;
  }
`;
