import { injectable, inject } from "inversify";
import type { IStorageService } from "infrastructure/protocols/StorageService";
import { GetMovieDTO } from "@/business/domain/DTOs/movie/get";
import { InfraTokens } from "libs/inversifyjs/tokens/infrastructureTokens";

@injectable()
export class MovieLocalDataSource {
  private readonly storageKey = "@movie-app:favorites";

  constructor(
    @inject(InfraTokens.IStorageService)
    private readonly storageService: IStorageService,
  ) {}

  async getFavorites(): Promise<GetMovieDTO[]> {
    const data = await this.storageService.getItem(this.storageKey);
    if (!data) {
      return [];
    }
    return JSON.parse(data) as GetMovieDTO[];
  }

  async saveFavorites(favorites: GetMovieDTO[]): Promise<void> {
    await this.storageService.setItem(this.storageKey, JSON.stringify(favorites));
  }
}
