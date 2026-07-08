import type { IAPIResponse } from "@/business/domain/common/api-response";
import AppError from '@/business/tools/AppError';
import { CodeMessagesEnum } from '@/business/domain/common/enums/code-messages';

export async function handleResponseRepository<T>(
  requestFn: () => Promise<T>,
  defaultErrorCode: CodeMessagesEnum
): Promise<IAPIResponse<T> | AppError> {
  try {
    const data = await requestFn();
    return {
      success: true,
      data,
    };
  } catch (error: any) {
    if (error instanceof AppError) {
      return error;
    }
    return new AppError(defaultErrorCode);
  }
}
