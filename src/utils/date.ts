import { MessageCode } from "domain/common/MessageCodes";

export const formatDate = (dateString: string, language: string): { value: string; error?: MessageCode } => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return { value: "", error: MessageCode.ERROR_INVALID_DATE };
  }
  return { value: date.toLocaleDateString(language === "pt" ? "pt-BR" : "en-US") };
};
