import { useTranslation } from "react-i18next";
import { useForm } from "@tanstack/react-form";

export const useSearch = (onSearch: (query: string) => void) => {
  const { t } = useTranslation();

  const form = useForm({
    defaultValues: {
      query: "",
    },
    onSubmit: async ({ value }) => {
      onSearch(value.query);
    },
  });

  return {
    t,
    form,
  };
};
