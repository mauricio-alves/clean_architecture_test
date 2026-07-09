import { IAPIResponse } from "@/business/domain/common/api-response";
import AppError from "@/business/tools/app-error";

export interface IGetBaseRepository<T> {
  execute(id: string): Promise<IAPIResponse<T> | AppError>;
}
