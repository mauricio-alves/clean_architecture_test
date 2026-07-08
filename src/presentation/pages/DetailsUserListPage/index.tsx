import { NotFound } from "presentation/components/molecules/NotFound";
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
import { useDetailsUserList } from "./hook";

export const DetailsUserListPage = () => {
  const {
    t,
    userList,
    baseImgUrl,
    handleRemoveMovie,
    getFormattedDate
  } = useDetailsUserList();

  return (
    <>
      <UserListContainer>
        <div>
          <UserListTitle>{t("myList.title")}</UserListTitle>
        </div>
        <BackButtonWrapper>
          <ListBackButton to="/">
            {t("common.backToHome")}
          </ListBackButton>
        </BackButtonWrapper>
        <div style={{ width: "100%" }}>
          {userList.length === 0 ? (
            <NotFound />
          ) : (
            <ListGrid>
              {userList.map((movie: any) => (
                <CardContainer key={movie.id}>
                  <CardImage src={`${baseImgUrl}${movie.posterPath}`} alt={movie.title} />
                  <CardTitle>
                    <strong>{movie.title}</strong>
                  </CardTitle>
                  <CardInfo>
                    {t("common.releaseDate")} {getFormattedDate(movie.releaseDate)}
                  </CardInfo>
                  <CardInfo>
                    {t("common.rating")} <strong>{movie.voteAverage.toFixed(1)}</strong>
                  </CardInfo>
                  <ButtonGroup>
                    <DetailButton to="/details/$id" params={{ id: movie.id.toString() }}>
                      {t("card.detailsButton")}
                    </DetailButton>
                    <Button variant="delete" onClick={() => handleRemoveMovie(movie.id)}>
                      {t("card.removeButton")}
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
