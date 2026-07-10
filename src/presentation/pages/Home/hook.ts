import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMovies } from "@/business/query-hooks/movie/queries/use-movies";
import { useUserList } from "@/business/query-hooks/user-list/queries/use-user-list";
import { filterMoviesBySearch } from "@/business/tools/filter-movies-by-search";
import { MovieCategoryEnum } from "@/business/domain/common/enums/movie-category";
import { useConfig } from "@/hooks/use-config";

export const useHome = () => {
  const { t } = useTranslation();
  const config = useConfig();

  const categories = Object.values(MovieCategoryEnum).map((category) => ({
    name: category,
    text: t(`home.categories.${category}`),
  }));

  const [currentCategory, setCurrentCategory] = useState(categories[1].name);
  const [search, setSearch] = useState("");
  const { movies, loading, changeCategory } = useMovies(currentCategory);
  const { userList } = useUserList();
  const baseImgUrl = config.getBaseImgUrl();

  const handleSelect = (name: MovieCategoryEnum) => {
    setCurrentCategory(name);
    changeCategory(name);
  };

  const filteredMovies = filterMoviesBySearch(movies, search);

  return {
    t,
    categories,
    search,
    setSearch,
    loading,
    userList,
    baseImgUrl,
    handleSelect,
    filteredMovies,
  };
};
