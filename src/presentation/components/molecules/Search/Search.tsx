import React from "react";
import { SearchContainer, SearchForm, SearchInput } from "./styles";

interface SearchProps {
  onSearch: (query: string) => void;
}

export const Search = ({ onSearch }: SearchProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <SearchContainer>
      <SearchForm>
        <SearchInput
          type="text"
          placeholder="Buscar filme..."
          onChange={handleInputChange}
        />
      </SearchForm>
    </SearchContainer>
  );
};
