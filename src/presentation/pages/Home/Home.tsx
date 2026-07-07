import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "presentation/components/molecules/Search/Search";
import { Card } from "presentation/components/organisms/Card/Card";
import { NotFound } from "presentation/components/molecules/NotFound/NotFound";
import { useMovies } from "hooks/movie/useMovies";
import { useUserList } from "hooks/userList/useUserList";
import { useConfig } from "hooks/useConfig";
import {
  HomeContainer,
  HomeTitleSection,
  CategorySection,
  CategoryList,
  CategoryItem,
  MiniUserList,
  MiniUserListImage,
  MiniUserListLink,
  MainContent,
  ResultsGrid
} from "./styles";

export const Home = () => {
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

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return loading ? (
    <HomeContainer>
      <HomeTitleSection>
        <h2>{t("common.loading")}</h2>
      </HomeTitleSection>
    </HomeContainer>
  ) : (
    <div>
      <HomeContainer>
        <HomeTitleSection>
          <h2>{t("home.title")}</h2>
          <Search onSearch={setSearch} />
        </HomeTitleSection>
        <CategorySection>
          <h3>{t("home.subtitle")}</h3>
          <CategoryList>
            {categories.map((item) => (
              <CategoryItem key={item.name} onClick={() => handleSelect(item.name)}>
                {item.text}
              </CategoryItem>
            ))}
          </CategoryList>
        </CategorySection>
        {userList.length > 0 && (
          <MiniUserList key={userList[0].title}>
            <MiniUserListImage src={`${baseImgUrl}${userList[0].posterPath}`} alt={userList[0].title} />
            <div>
              <h4>{t("home.myList.title")}</h4>
              <MiniUserListLink to="/details/userList">
                {t("home.myList.details")}
              </MiniUserListLink>
            </div>
          </MiniUserList>
        )}
      </HomeContainer>
      <MainContent>
        {filteredMovies.length === 0 ? (
          <NotFound />
        ) : (
          <ResultsGrid>
            {filteredMovies.map((movie) => (
              <div key={movie.id}>
                <Card movie={movie} />
              </div>
            ))}
          </ResultsGrid>
        )}
      </MainContent>
    </div>
  );
};
