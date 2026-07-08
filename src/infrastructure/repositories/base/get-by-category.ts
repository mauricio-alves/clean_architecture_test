import { injectable } from "inversify";
import type { IAPIResponse } from "@/business/domain/common/api-response";
import AppError from "@/business/tools/AppError";
import { CodeMessagesEnum } from "@/business/domain/common/enums/code-messages";
import { handleResponseRepository } from "@/infrastructure/utils/handle-response-repository";
import type { IGetByCategoryBaseRepository } from "@/business/domain/repositories/base/get-by-category";

@injectable()
export abstract class BaseGetByCategoryRepository<T> implements IGetByCategoryBaseRepository<T> {
  protected abstract getErrorCode(): CodeMessagesEnum;
  protected abstract fetchData(category: string): Promise<T[]>;

  async execute(category: string): Promise<IAPIResponse<T[]> | AppError> {
    return handleResponseRepository(
      () => this.fetchData(category),
      this.getErrorCode()
    );
  }
}
