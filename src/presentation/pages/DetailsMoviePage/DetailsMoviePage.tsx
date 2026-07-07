import { useNavigate, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useMovieDetails } from "hooks/movie/useMovieDetails";
import { useConfig } from "hooks/useConfig";
import { formatDate } from "utils/date";
import { messageCodeToI18nKey } from "utils/messageCodeToI18nKey";
import { DetailsContainer, ImageWrapper, MovieImage, InfoSection, GenresList, BackButton } from "./styles";

export const DetailsMoviePage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const config = useConfig();
  const { id } = useParams({ from: "/details/$id" });
  const { movie, loading, error } = useMovieDetails(id);
  const baseImgUrl = config.getBaseImgUrl();
  const backdropImgUrl = config.getBackdropImgUrl();

  if (error) {
    navigate({ to: "/" });
    return null;
  }

  const imgUrl = movie?.backdropPath ? `${backdropImgUrl}/${movie.backdropPath}` : "";

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "50px", color: "#02b0c8" }}>
        <h2>{t("common.loading")}</h2>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  const dateResult = formatDate(movie.releaseDate, i18n.language);
  const formattedDate = dateResult.error ? t(messageCodeToI18nKey[dateResult.error]) : dateResult.value;

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
          {movie.genres?.map((genre) => (
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
