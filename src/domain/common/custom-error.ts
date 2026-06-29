/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage } from "../dtos/common/error-message";

export interface ICustomError<T = any> {
  errors?: ErrorMessage[];
  translatedErrors: string[];
}
