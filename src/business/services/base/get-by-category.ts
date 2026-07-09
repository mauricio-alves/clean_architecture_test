import { injectable } from "inversify";
import type { IAPIResponse } from "@/business/domain/common/api-response";
import AppError from "@/business/tools/app-error";
import type { IGetByCategoryBaseUseCase } from "@/business/domain/services/base/get-by-category";
import type { IGetByCategoryBaseRepository } from "@/business/domain/repositories/base/get-by-category";

@injectable()
export abstract class BaseGetByCategoryUseCase<T> implements IGetByCategoryBaseUseCase<T> {
  protected abstract get repository(): IGetByCategoryBaseRepository<T>;

  async execute(category: string): Promise<IAPIResponse<T[]> | AppError> {
    return this.repository.execute(category);
  }
}
