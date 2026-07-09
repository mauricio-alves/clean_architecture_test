import { IAPIResponse } from "@/business/domain/common/api-response";
import AppError from "@/business/tools/app-error";

export interface IGetByCategoryBaseRepository<T> {
  execute(category: string): Promise<IAPIResponse<T[]> | AppError>;
}
