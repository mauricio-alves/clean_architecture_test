import { injectable } from "inversify";
import type { IAPIResponse } from "@/business/domain/common/api-response";
import AppError from "@/business/tools/app-error";
import type { IGetBaseUseCase } from "@/business/domain/services/base/get";
import type { IGetBaseRepository } from "@/business/domain/repositories/base/get";

@injectable()
export abstract class BaseGetUseCase<TEntity, TDto = TEntity> implements IGetBaseUseCase<TEntity> {
  protected abstract get repository(): IGetBaseRepository<TDto>;
  protected abstract toEntity(dto: TDto): TEntity;

  async execute(id: string): Promise<IAPIResponse<TEntity> | AppError> {
    const response = await this.repository.execute(id);
    if (response instanceof AppError) {
      return response;
    }
    return {
      ...response,
      data: this.toEntity(response.data),
    };
  }
}
