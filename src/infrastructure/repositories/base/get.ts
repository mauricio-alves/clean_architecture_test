import { injectable } from "inversify";
import type { IAPIResponse } from "@/business/domain/common/api-response";
import AppError from "@/business/tools/app-error";
import { CodeMessagesEnum } from "@/business/domain/common/enums/code-messages";
import { handleResponseRepository } from "@/infrastructure/utils/handle-response-repository";
import type { IGetBaseRepository } from "@/business/domain/repositories/base/get";

@injectable()
export abstract class BaseGetRepository<T> implements IGetBaseRepository<T> {
  protected abstract getErrorCode(): CodeMessagesEnum;
  protected abstract fetchData(id: string): Promise<T>;

  async execute(id: string): Promise<IAPIResponse<T> | AppError> {
    return handleResponseRepository(
      () => this.fetchData(id),
      this.getErrorCode()
    );
  }
}
