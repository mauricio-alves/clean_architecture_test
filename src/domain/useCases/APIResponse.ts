import { MessageCode } from "domain/common/MessageCodes";

export interface IAPIResponse<T> {
  data: T;
  messageCode?: MessageCode;
}
