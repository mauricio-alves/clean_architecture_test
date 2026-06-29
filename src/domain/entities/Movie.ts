export class Movie {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly posterPath: string,
    public readonly releaseDate: string,
    public readonly voteAverage: number,
    public readonly backdropPath?: string,
    public readonly tagline?: string,
    public readonly genres?: { id: number; name: string }[],
    public readonly overview?: string
  ) {}
}
