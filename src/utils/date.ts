import { CodeMessagesEnum } from "@/business/domain/common/enums/code-messages";

export const formatDate = (dateString: string, language: string): { value: string; error?: CodeMessagesEnum } => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return { value: "", error: CodeMessagesEnum.ERROR_INVALID_DATE };
  }
  return { value: date.toLocaleDateString(language === "pt" ? "pt-BR" : "en-US") };
};

