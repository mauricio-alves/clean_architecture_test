import { Movie } from "business/domain/models/Movie";
import { Button } from "presentation/components/atoms/Button";
import { CardContainer, CardImage, CardTitle, CardInfo, ButtonGroup, DetailButton } from "./styles";
import { useCard } from "./hook";

export interface CardProps {
  movie: Movie;
}

export const Card = ({ movie }: CardProps) => {
  const { baseImgUrl, t, handleAddMovie, formattedDate } = useCard(movie);

  return (
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
  );
};
