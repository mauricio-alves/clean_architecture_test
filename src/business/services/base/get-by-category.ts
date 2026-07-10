import { injectable } from "inversify";
import type { IAPIResponse } from "@/business/domain/common/api-response";
import AppError from "@/business/tools/app-error";
import type { IGetByCategoryBaseUseCase } from "@/business/domain/services/base/get-by-category";
import type { IGetByCategoryBaseRepository } from "@/business/domain/repositories/base/get-by-category";

@injectable()
export abstract class BaseGetByCategoryUseCase<TEntity, TDto = TEntity> implements IGetByCategoryBaseUseCase<TEntity> {
  protected abstract get repository(): IGetByCategoryBaseRepository<TDto>;
  protected abstract toEntityList(dtos: TDto[]): TEntity[];

  async execute(category: string): Promise<IAPIResponse<TEntity[]> | AppError> {
    const response = await this.repository.execute(category);
    if (response instanceof AppError) {
      return response;
    }
    return {
      ...response,
      data: this.toEntityList(response.data),
    };
  }
}
