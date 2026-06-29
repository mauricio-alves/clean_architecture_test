import { useState } from "react";
import { Search } from "presentation/components/molecules/Search/Search";
import { Card } from "presentation/components/organisms/Card/Card";
import { NotFound } from "presentation/components/molecules/NotFound/NotFound";
import { useMovies } from "hooks/movie/useMovies";
import { useUserList } from "hooks/userList/useUserList";
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
  const categories = [
    { name: "now_playing", text: "Agora no cinema" },
    { name: "popular", text: "Populares" },
    { name: "top_rated", text: "Melhores avaliados" },
    { name: "upcoming", text: "Que estão por vir" },
  ];

  const [currentCategory, setCurrentCategory] = useState(categories[1].name);
  const [search, setSearch] = useState("");
  const { movies, loading, changeCategory } = useMovies(currentCategory);
  const { userList } = useUserList();
  const baseImgUrl = "https://image.tmdb.org/t/p/w500";

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
        <h2>Carregando...</h2>
      </HomeTitleSection>
    </HomeContainer>
  ) : (
    <div>
      <HomeContainer>
        <HomeTitleSection>
          <h2>Catálogo de Filmes</h2>
          <Search onSearch={setSearch} />
        </HomeTitleSection>
        <CategorySection>
          <h3>Quais filmes quer ver?</h3>
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
              <h4>Sua Lista</h4>
              <MiniUserListLink to="/details/userList">
                Detalhes
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
