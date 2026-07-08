import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMovies } from "business/custom-hooks/movie/useMovies";
import { useUserList } from "business/custom-hooks/userList/useUserList";
import { useConfig } from "hooks/useConfig";

export const useHome = () => {
  const { t } = useTranslation();
  const config = useConfig();

  const categories = [
    { name: "now_playing", text: t("home.categories.now_playing") },
    { name: "popular", text: t("home.categories.popular") },
    { name: "top_rated", text: t("home.categories.top_rated") },
    { name: "upcoming", text: t("home.categories.upcoming") },
  ];

  const [currentCategory, setCurrentCategory] = useState(categories[1].name);
  const [search, setSearch] = useState("");
  const { movies, loading, changeCategory } = useMovies(currentCategory);
  const { userList } = useUserList();
  const baseImgUrl = config.getBaseImgUrl();

  const handleSelect = (name: string) => {
    setCurrentCategory(name);
    changeCategory(name);
  };

  const removeAccents = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const filteredMovies = movies.filter((movie) =>
    removeAccents(movie.title.toLowerCase()).includes(removeAccents(search.toLowerCase()))
  );

  return {
    t,
    categories,
    search,
    setSearch,
    loading,
    userList,
    baseImgUrl,
    handleSelect,
    filteredMovies
  };
};
