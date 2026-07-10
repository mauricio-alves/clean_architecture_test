import { Movie } from "@/business/domain/models/movie/movie";
import { Button } from "@/presentation/components/atoms/Button";
import { CardContainer, CardImage, CardTitle, CardInfo, ButtonGroup, DetailButton } from "./styles";
import { useCard } from "./hook";
import type { CardVariant } from "./types";

export interface CardProps {
  movie: Movie;
  variant?: CardVariant;
}

export const Card = ({ movie, variant = "add" }: CardProps) => {
  const { baseImgUrl, t, handleAction, formattedDate } = useCard(movie, variant);

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
        <Button variant={variant === "add" ? "add" : "delete"} onClick={handleAction}>
          {t(variant === "add" ? "card.addButton" : "card.removeButton")}
        </Button>
      </ButtonGroup>
    </CardContainer>
  );
};
