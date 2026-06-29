import { useNavigate, useParams } from "react-router-dom";
import { useMovieDetails } from "hooks/movie/useMovieDetails";
import { DetailsContainer, ImageWrapper, MovieImage, InfoSection, GenresList, BackButton } from "./styles";

export const DetailsMoviePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { movie, loading, error } = useMovieDetails(id);
  const baseImgUrl = "https://image.tmdb.org/t/p/w500";

  if (error) {
    navigate("/error");
    return null;
  }

  const imgUrl = movie?.backdropPath ? `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdropPath}` : "";

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "50px", color: "#02b0c8" }}>
        <h2>Carregando...</h2>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <DetailsContainer $bgImage={imgUrl}>
      <ImageWrapper>
        <MovieImage src={`${baseImgUrl}${movie.posterPath}`} alt={movie.title} />
      </ImageWrapper>
      <InfoSection>
        <h2>
          <strong>{movie.title}</strong>
        </h2>
        <h3>{movie.tagline}</h3>
        <p>
          <strong>Lançamento:</strong> {new Date(movie.releaseDate).toLocaleDateString("pt-BR")}
        </p>
        <GenresList>
          <strong>Gêneros:</strong>{" "}
          {movie.genres?.map((genre) => (
            <span key={genre.id}>{genre.name}.</span>
          ))}
        </GenresList>
        <p>
          <strong>Nota: </strong>
          <span>{movie.voteAverage.toFixed(1)}</span>
        </p>
        <p>
          <strong>Sinopse: </strong>
          {movie.overview}
        </p>
        <BackButton to="/">Voltar para a Home</BackButton>
      </InfoSection>
    </DetailsContainer>
  );
};
