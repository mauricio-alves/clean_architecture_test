import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SearchContainer, SearchForm, SearchInput, SearchError } from "./styles";
import { searchSchema } from "./validations";

interface SearchProps {
  onSearch: (query: string) => void;
}

export const Search = ({ onSearch }: SearchProps) => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const result = searchSchema.safeParse(value);

    if (result.success) {
      setError(null);
      onSearch(result.data);
    } else {
      setError(t(result.error.issues[0].message as any));
    }
  };

  return (
    <SearchContainer>
      <SearchForm>
        <SearchInput
          type="text"
          placeholder={t("search.placeholder")}
          onChange={handleInputChange}
        />
      </SearchForm>
      {error && <SearchError>{error}</SearchError>}
    </SearchContainer>
  );
};
