import { CodeMessagesEnum } from "@/business/domain/common/enums/code-messages";

export default class AppError extends Error {
  public readonly code: CodeMessagesEnum;

  constructor(code: CodeMessagesEnum) {
    super(code);
    this.name = "AppError";
    this.code = code;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
