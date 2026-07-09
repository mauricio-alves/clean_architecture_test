import { injectable } from "inversify";
import type { IAPIResponse } from "@/business/domain/common/api-response";
import AppError from "@/business/tools/app-error";
import type { IGetBaseUseCase } from "@/business/domain/services/base/get";
import type { IGetBaseRepository } from "@/business/domain/repositories/base/get";

@injectable()
export abstract class BaseGetUseCase<T> implements IGetBaseUseCase<T> {
  protected abstract get repository(): IGetBaseRepository<T>;

  async execute(id: string): Promise<IAPIResponse<T> | AppError> {
    return this.repository.execute(id);
  }
}
