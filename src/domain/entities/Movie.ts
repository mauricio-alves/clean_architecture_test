export class Movie {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly posterPath: string,
    readonly releaseDate: string,
    readonly voteAverage: number,
    readonly backdropPath?: string,
    readonly tagline?: string,
    readonly genres?: { id: number; name: string }[],
    readonly overview?: string
  ) {}
}
