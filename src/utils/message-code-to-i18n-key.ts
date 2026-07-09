import { CodeMessagesEnum } from "@/business/domain/common/enums/code-messages";

export const messageCodeToI18nKey: Record<CodeMessagesEnum, string> = {
  [CodeMessagesEnum.MOVIE_ALREADY_IN_LIST]: "messages.MOVIE_ALREADY_IN_LIST",
  [CodeMessagesEnum.MOVIE_ADDED_TO_LIST]: "messages.MOVIE_ADDED_TO_LIST",
  [CodeMessagesEnum.MOVIE_REMOVED_FROM_LIST]: "messages.MOVIE_REMOVED_FROM_LIST",
  [CodeMessagesEnum.ERROR_GET_MOVIES]: "messages.ERROR_GET_MOVIES",
  [CodeMessagesEnum.ERROR_GET_MOVIE_DETAILS]: "messages.ERROR_GET_MOVIE_DETAILS",
  [CodeMessagesEnum.ERROR_GET_USER_LIST]: "messages.ERROR_GET_USER_LIST",
  [CodeMessagesEnum.ERROR_GET_MOVIES_BY_CATEGORY]: "messages.ERROR_GET_MOVIES_BY_CATEGORY",
  [CodeMessagesEnum.ERROR_ADD_MOVIE_TO_USER_LIST]: "messages.ERROR_ADD_MOVIE_TO_USER_LIST",
  [CodeMessagesEnum.ERROR_REMOVE_MOVIE_FROM_USER_LIST]: "messages.ERROR_REMOVE_MOVIE_FROM_USER_LIST",
  [CodeMessagesEnum.ERROR_ADD_MOVIE]: "messages.ERROR_ADD_MOVIE",
  [CodeMessagesEnum.ERROR_REMOVE_MOVIE]: "messages.ERROR_REMOVE_MOVIE",
  [CodeMessagesEnum.ERROR_UNAUTHORIZED]: "messages.ERROR_UNAUTHORIZED",
  [CodeMessagesEnum.ERROR_NOT_FOUND]: "messages.ERROR_NOT_FOUND",
  [CodeMessagesEnum.ERROR_SERVER]: "messages.ERROR_SERVER",
  [CodeMessagesEnum.ERROR_NETWORK]: "messages.ERROR_NETWORK",
  [CodeMessagesEnum.ERROR_INVALID_DATE]: "messages.ERROR_INVALID_DATE",
};
