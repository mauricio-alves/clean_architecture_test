import { Toaster } from "react-hot-toast";
import { useUserList } from "hooks/userList/useUserList";
import { NotFound } from "presentation/components/molecules/NotFound/NotFound";
import { Button } from "presentation/components/atoms/Button";
import {
  CardContainer,
  CardImage,
  CardTitle,
  CardInfo,
  ButtonGroup,
  DetailButton
} from "presentation/components/organisms/Card/styles";
import {
  UserListContainer,
  UserListTitle,
  BackButtonWrapper,
  ListBackButton,
  ListGrid
} from "./styles";

export const DetailsUserListPage = () => {
  const baseImgUrl = "https://image.tmdb.org/t/p/w500";
  const { userList, removeMovie } = useUserList();

  const handleRemoveMovie = async (id: number) => {
    await removeMovie(id);
  };

  return (
    <>
      <div>
        <Toaster />
      </div>

      <UserListContainer>
        <div>
          <UserListTitle>Esses são os filmes da sua lista!</UserListTitle>
        </div>
        <BackButtonWrapper>
          <ListBackButton to="/">
            Voltar para a Home
          </ListBackButton>
        </BackButtonWrapper>
        <div style={{ width: "100%" }}>
          {userList.length === 0 ? (
            <NotFound />
          ) : (
            <ListGrid>
              {userList.map((movie) => (
                <CardContainer key={movie.id}>
                  <CardImage src={`${baseImgUrl}${movie.posterPath}`} alt={movie.title} />
                  <CardTitle>
                    <strong>{movie.title}</strong>
                  </CardTitle>
                  <CardInfo>Lançamento: {new Date(movie.releaseDate).toLocaleDateString("pt-BR")}</CardInfo>
                  <CardInfo>
                    Nota: <strong>{movie.voteAverage.toFixed(1)}</strong>
                  </CardInfo>
                  <ButtonGroup>
                    <DetailButton to={`/details/${movie.id}`}>
                      Saiba mais
                    </DetailButton>
                    <Button variant="delete" onClick={() => handleRemoveMovie(movie.id)}>
                      Remover da Lista
                    </Button>
                  </ButtonGroup>
                </CardContainer>
              ))}
            </ListGrid>
          )}
        </div>
      </UserListContainer>
    </>
  );
};
