import { useTranslation } from "react-i18next";
import { Movie } from "domain/entities/Movie";
import { useUserList } from "hooks/userList/useUserList";
import { useConfig } from "hooks/useConfig";
import { Button } from "presentation/components/atoms/Button/Button";
import { formatDate } from "utils/date";
import { messageCodeToI18nKey } from "utils/messageCodeToI18nKey";
import { CardContainer, CardImage, CardTitle, CardInfo, ButtonGroup, DetailButton } from "./styles";

interface CardProps {
  movie: Movie;
}

export const Card = ({ movie }: CardProps) => {
  const config = useConfig();
  const baseImgUrl = config.getBaseImgUrl();
  const { addMovie } = useUserList();
  const { t, i18n } = useTranslation();

  const handleAddMovie = async () => {
    await addMovie(movie);
  };

  const dateResult = formatDate(movie.releaseDate, i18n.language);
  const formattedDate = dateResult.error ? t(messageCodeToI18nKey[dateResult.error]) : dateResult.value;

  return (
    <>
      <CardContainer>
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
          <DetailButton to="/details/$id" params={{ id: movie.id.toString() }}>
            {t("card.detailsButton")}
          </DetailButton>
          <Button variant="add" onClick={handleAddMovie}>
            {t("card.addButton")}
          </Button>
        </ButtonGroup>
      </CardContainer>
    </>
  );
};
