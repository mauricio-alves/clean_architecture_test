import { IAPIResponse } from "../domain/common/api-response";
import AppError from "@/business/tools/AppError";

export interface IUseCase<Input, Output> {
  execute(input: Input): Promise<IAPIResponse<Output> | AppError>;
}
