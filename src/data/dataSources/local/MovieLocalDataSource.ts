import { injectable, inject } from "inversify";
import type { IStorageService } from "data/protocols/IStorageService";
import { MovieDTO } from "data/dtos/MovieDTO";
import { TOKENS } from "libs/inversifyjs/tokens";

@injectable()
export class MovieLocalDataSource {
  private readonly storageKey = "@movie-app:favorites";

  constructor(
    @inject(TOKENS.IStorageService)
    private readonly storageService: IStorageService,
  ) {}

  async getFavorites(): Promise<MovieDTO[]> {
    const data = await this.storageService.getItem(this.storageKey);
    if (!data) {
      return [];
    }
    return JSON.parse(data) as MovieDTO[];
  }

  async saveFavorites(favorites: MovieDTO[]): Promise<void> {
    await this.storageService.setItem(this.storageKey, JSON.stringify(favorites));
  }
}
