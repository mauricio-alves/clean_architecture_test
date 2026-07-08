import { DetailsContainer, ImageWrapper, MovieImage, InfoSection, GenresList, BackButton } from "./styles";
import { useDetailsMovie } from "./hook";

export const DetailsMoviePage = () => {
  const { t, movie, loading, error, imgUrl, baseImgUrl, formattedDate } = useDetailsMovie();

  if (error) {
    return null;
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "50px" }}>
        <h2>{t("common.loading")}</h2>
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
          <strong>{t("common.releaseDate")}</strong> {formattedDate}
        </p>
        <GenresList>
          <strong>{t("common.genres")}</strong>{" "}
          {movie.genres?.map((genre: any) => (
            <span key={genre.id}>{genre.name}.</span>
          ))}
        </GenresList>
        <p>
          <strong>{t("common.rating")} </strong>
          <span>{movie.voteAverage.toFixed(1)}</span>
        </p>
        <p>
          <strong>{t("common.overview")} </strong>
          {movie.overview}
        </p>
        <BackButton to="/">{t("common.backToHome")}</BackButton>
      </InfoSection>
    </DetailsContainer>
  );
};
