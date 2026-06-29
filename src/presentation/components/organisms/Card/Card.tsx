import { Toaster } from "react-hot-toast";
import { Movie } from "domain/entities/Movie";
import { useUserList } from "hooks/userList/useUserList";
import { Button } from "presentation/components/atoms/Button";
import { CardContainer, CardImage, CardTitle, CardInfo, ButtonGroup, DetailButton } from "./styles";

interface CardProps {
  movie: Movie;
}

export const Card = ({ movie }: CardProps) => {
  const baseImgUrl = "https://image.tmdb.org/t/p/w500";
  const { addMovie } = useUserList();

  const handleAddMovie = async () => {
    await addMovie(movie);
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <CardContainer>
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
          <Button variant="add" onClick={handleAddMovie}>
            Adicionar a lista
          </Button>
        </ButtonGroup>
      </CardContainer>
    </>
  );
};
