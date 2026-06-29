/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ICustomError } from "../common/custom-error";
import type { ErrorMessage } from "../dtos/common/error-message";

export default class AppError extends Error {
  private readonly _error?: ErrorMessage[];

  private readonly _translatedErrors: string[] = [];

  private readonly _message?: string;

  constructor(appError: ICustomError<any> | string) {
    const msg = typeof appError === "string" ? appError : appError.translatedErrors?.[0] || "";
    super(msg);
    this.name = "AppError";
    Object.setPrototypeOf(this, AppError.prototype);

    if (typeof appError === "string") {
      this._message = appError;
    }

    if (typeof appError === "object") {
      const { errors, translatedErrors } = appError;

      this._error = errors;
      this._translatedErrors = translatedErrors;
      this._message = msg;
    }
  }

  get error(): ErrorMessage[] | undefined {
    return this._error;
  }

  get message(): string {
    return this._message || "";
  }

  get translatedErrors(): string[] {
    return this._translatedErrors;
  }
}
