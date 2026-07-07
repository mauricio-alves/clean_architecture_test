import { AxiosInstance } from "axios";
import AppError from "domain/errors/AppError";
import { MessageCode } from "domain/common/MessageCodes";

export const responseInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        const { status } = error.response;
        console.error(`[HTTP Response Error] ${status} ${error.config.url}`, error.response.data);
        if (status === 401) {
          return Promise.reject(new AppError(MessageCode.ERROR_UNAUTHORIZED));
        }
        if (status === 404) {
          return Promise.reject(new AppError(MessageCode.ERROR_NOT_FOUND));
        }
        if (status >= 500) {
          return Promise.reject(new AppError(MessageCode.ERROR_SERVER));
        }
      } else if (error.request) {
        console.error("[HTTP Network Error] Sem resposta do servidor", error.request);
        return Promise.reject(new AppError(MessageCode.ERROR_NETWORK));
      } else {
        console.error("[HTTP Error]", error.message);
      }
      return Promise.reject(error);
    }
  );
};
