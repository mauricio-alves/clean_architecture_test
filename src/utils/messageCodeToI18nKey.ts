import { MessageCode } from "domain/common/MessageCodes";

export const messageCodeToI18nKey = {
  [MessageCode.MOVIE_ALREADY_IN_LIST]: "messages.MOVIE_ALREADY_IN_LIST",
  [MessageCode.MOVIE_ADDED_TO_LIST]: "messages.MOVIE_ADDED_TO_LIST",
  [MessageCode.MOVIE_REMOVED_FROM_LIST]: "messages.MOVIE_REMOVED_FROM_LIST",
  [MessageCode.ERROR_ADD_MOVIE]: "messages.ERROR_ADD_MOVIE",
  [MessageCode.ERROR_REMOVE_MOVIE]: "messages.ERROR_REMOVE_MOVIE",
  [MessageCode.ERROR_GET_MOVIES]: "messages.ERROR_GET_MOVIES",
  [MessageCode.ERROR_GET_MOVIE_DETAILS]: "messages.ERROR_GET_MOVIE_DETAILS",
  [MessageCode.ERROR_GET_USER_LIST]: "messages.ERROR_GET_USER_LIST",
  [MessageCode.ERROR_UNAUTHORIZED]: "messages.ERROR_UNAUTHORIZED",
  [MessageCode.ERROR_NOT_FOUND]: "messages.ERROR_NOT_FOUND",
  [MessageCode.ERROR_SERVER]: "messages.ERROR_SERVER",
  [MessageCode.ERROR_NETWORK]: "messages.ERROR_NETWORK",
  [MessageCode.ERROR_INVALID_DATE]: "messages.ERROR_INVALID_DATE",
} as const;
