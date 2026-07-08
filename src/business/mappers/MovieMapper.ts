import { Movie } from "business/domain/models/Movie";
import { MovieDTO } from "business/domain/models/MovieDTO";

export class MovieMapper {
  static toEntity(dto: MovieDTO): Movie {
    return new Movie(
      dto.id,
      dto.title,
      dto.poster_path,
      dto.release_date,
      dto.vote_average,
      dto.backdrop_path,
      dto.tagline,
      dto.genres,
      dto.overview
    );
  }

  static toEntityList(dtos: MovieDTO[]): Movie[] {
    return dtos.map(MovieMapper.toEntity);
  }

  static toDTO(entity: Movie): MovieDTO {
    return {
      id: entity.id,
      title: entity.title,
      poster_path: entity.posterPath,
      release_date: entity.releaseDate,
      vote_average: entity.voteAverage,
      backdrop_path: entity.backdropPath,
      tagline: entity.tagline,
      genres: entity.genres,
      overview: entity.overview
    };
  }

  static toDTOList(entities: Movie[]): MovieDTO[] {
    return entities.map(MovieMapper.toDTO);
  }
}
