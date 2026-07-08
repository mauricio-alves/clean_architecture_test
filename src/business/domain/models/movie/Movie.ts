export interface Movie {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
  backdropPath?: string;
  tagline?: string;
  genres?: { id: number; name: string }[];
  overview?: string;
}
