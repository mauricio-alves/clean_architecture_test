import { Search } from "@/presentation/components/molecules/Search";
import { Card } from "@/presentation/components/organisms/Card";
import { NotFound } from "@/presentation/components/molecules/NotFound";
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
import { useHome } from "./hook";

export const Home = () => {
  const {
    t,
    categories,
    setSearch,
    loading,
    userList,
    baseImgUrl,
    handleSelect,
    filteredMovies
  } = useHome();

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
