import { Movie } from "@/business/domain/models/movie/movie";

const removeAccents = (value: string) => value.normalize("NFD").replace(/[̀-ͯ]/g, "");

export const filterMoviesBySearch = (movies: Movie[], search: string): Movie[] => {
  const normalizedSearch = removeAccents(search.toLowerCase());
  return movies.filter((movie) => removeAccents(movie.title.toLowerCase()).includes(normalizedSearch));
};
