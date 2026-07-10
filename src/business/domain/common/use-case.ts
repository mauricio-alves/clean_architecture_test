import { IAPIResponse } from "@/business/domain/common/api-response";
import AppError from "@/business/tools/app-error";

export interface IUseCase<Input, Output> {
  execute(input: Input): Promise<IAPIResponse<Output> | AppError>;
}
