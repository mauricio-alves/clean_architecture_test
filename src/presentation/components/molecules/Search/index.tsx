import { SearchContainer, SearchForm, SearchInput, SearchError } from "./styles";
import { searchSchema } from "./validation";
import { useSearch } from "./hook";

interface SearchProps {
  onSearch: (query: string) => void;
}

export const Search = ({ onSearch }: SearchProps) => {
  const { t, form } = useSearch(onSearch);

  return (
    <SearchContainer>
      <SearchForm
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="query"
          validators={{
            onChange: searchSchema,
          }}
          children={(field) => (
            <>
              <SearchInput
                type="text"
                placeholder={t("search.placeholder")}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 ? (
                <SearchError>{t((field.state.meta.errors[0] as any).message as any)}</SearchError>
              ) : null}
            </>
          )}
        />
      </SearchForm>
    </SearchContainer>
  );
};
