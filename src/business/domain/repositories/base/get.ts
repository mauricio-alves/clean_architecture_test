import { IAPIResponse } from "@/business/domain/common/api-response";
import AppError from "@/business/tools/AppError";

export interface IGetBaseRepository<T> {
  execute(id: string): Promise<IAPIResponse<T> | AppError>;
}
