import { IAPIResponse } from "@/business/domain/common/api-response";
import AppError from "@/business/tools/AppError";

export interface IGetByCategoryBaseRepository<T> {
  execute(category: string): Promise<IAPIResponse<T[]> | AppError>;
}
