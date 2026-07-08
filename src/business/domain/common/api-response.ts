import { ErrorMessage } from "../DTOs/error-message";

export interface IAPIResponse<T> {
  success: boolean;
  data: T;
  errors?: ErrorMessage;
}
