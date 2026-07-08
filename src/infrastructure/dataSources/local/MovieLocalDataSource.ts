import { injectable, inject } from "inversify";
import type { IStorageService } from "infrastructure/protocols/StorageService";
import { MovieDTO } from "business/domain/models/MovieDTO";
import { MovieTokens } from "libs/inversifyjs/tokens/movieTokens"; import { UserListTokens } from "libs/inversifyjs/tokens/userListTokens"; import { InfraTokens } from "libs/inversifyjs/tokens/infrastructureTokens";

@injectable()
export class MovieLocalDataSource {
  private readonly storageKey = "@movie-app:favorites";

  constructor(
    @inject(InfraTokens.IStorageService)
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

