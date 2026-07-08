import { IAPIResponse } from "./APIResponse";
import AppError from "business/domain/errors/AppError";

export interface IUseCase<Input, Output> {
  execute(input: Input): Promise<IAPIResponse<Output> | AppError>;
}
