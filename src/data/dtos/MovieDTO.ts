export interface MovieDTO {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  backdrop_path?: string;
  tagline?: string;
  genres?: { id: number; name: string }[];
  overview?: string;
}
