import { Movie } from "@/business/domain/models/movie/Movie";
import { GetMovieDTO } from "@/business/domain/DTOs/movie/get";

export class MovieMapper {
  static toEntity(dto: GetMovieDTO): Movie {
    return {
      id: dto.id,
      title: dto.title,
      posterPath: dto.poster_path,
      releaseDate: dto.release_date,
      voteAverage: dto.vote_average,
      backdropPath: dto.backdrop_path,
      tagline: dto.tagline,
      genres: dto.genres,
      overview: dto.overview,
    };
  }

  static toEntityList(dtos: GetMovieDTO[]): Movie[] {
    return dtos.map(MovieMapper.toEntity);
  }

  static toDTO(entity: Movie): GetMovieDTO {
    return {
      id: entity.id,
      title: entity.title,
      poster_path: entity.posterPath,
      release_date: entity.releaseDate,
      vote_average: entity.voteAverage,
      backdrop_path: entity.backdropPath,
      tagline: entity.tagline,
      genres: entity.genres,
      overview: entity.overview,
    };
  }

  static toDTOList(entities: Movie[]): GetMovieDTO[] {
    return entities.map(MovieMapper.toDTO);
  }
}
