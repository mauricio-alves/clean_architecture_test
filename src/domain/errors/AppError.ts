import { MessageCode } from "domain/common/MessageCodes";

export default class AppError extends Error {
  private readonly _messageCode: MessageCode;

  constructor(messageCode: MessageCode) {
    super(messageCode);
    this.name = "AppError";
    this._messageCode = messageCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }

  get messageCode(): MessageCode {
    return this._messageCode;
  }

  get message(): string {
    return this._messageCode;
  }
}
