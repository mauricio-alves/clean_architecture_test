import { ErrorMessage } from "../dtos/error-message";

export interface IAPIResponse<T> {
  success: boolean;
  data: T;
  errors?: ErrorMessage;
}
