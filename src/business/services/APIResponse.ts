import { MessageCode } from "business/domain/common/MessageCodes";

export interface IAPIResponse<T> {
  data: T;
  messageCode?: MessageCode;
}
