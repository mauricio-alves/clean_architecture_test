import { Movie } from "domain/entities/Movie";

export interface IUserListRepository {
  getUserList(): Promise<Movie[]>;
  addMovie(movie: Movie): Promise<Movie[]>;
  removeMovie(movieId: number): Promise<Movie[]>;
}
