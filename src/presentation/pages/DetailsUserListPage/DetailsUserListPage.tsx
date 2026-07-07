import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useUserList } from "hooks/userList/useUserList";
import { useConfig } from "hooks/useConfig";
import { NotFound } from "presentation/components/molecules/NotFound/NotFound";
import { Button } from "presentation/components/atoms/Button/Button";
import { formatDate } from "utils/date";
import { messageCodeToI18nKey } from "utils/messageCodeToI18nKey";
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
  const config = useConfig();
  const baseImgUrl = config.getBaseImgUrl();
  const { userList, removeMovie } = useUserList();
  const { t, i18n } = useTranslation();

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
              {userList.map((movie) => {
                const dateResult = formatDate(movie.releaseDate, i18n.language);
                const formattedDate = dateResult.error ? t(messageCodeToI18nKey[dateResult.error]) : dateResult.value;

                return (
                  <CardContainer key={movie.id}>
                    <CardImage src={`${baseImgUrl}${movie.posterPath}`} alt={movie.title} />
                    <CardTitle>
                      <strong>{movie.title}</strong>
                    </CardTitle>
                    <CardInfo>
                      {t("common.releaseDate")} {formattedDate}
                    </CardInfo>
                    <CardInfo>
                      {t("common.rating")} <strong>{movie.voteAverage.toFixed(1)}</strong>
                    </CardInfo>
                    <ButtonGroup>
                      <DetailButton to={"/details/$id" as any} params={{ id: movie.id.toString() } as any}>
                        {t("card.detailsButton")}
                      </DetailButton>
                      <Button variant="delete" onClick={() => handleRemoveMovie(movie.id)}>
                        {t("card.removeButton")}
                      </Button>
                    </ButtonGroup>
                  </CardContainer>
                );
              })}
            </ListGrid>
          )}
        </div>
      </UserListContainer>
    </>
  );
};
