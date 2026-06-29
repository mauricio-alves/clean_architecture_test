import { AxiosInstance } from "axios";

export const registerRequestInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    (config) => {
      console.log(`[HTTP Request] ${config.method?.toUpperCase()} ${config.url}`, config.params);
      return config;
    },
    (error) => {
      console.error("[HTTP Request Error]", error);
      return Promise.reject(error);
    }
  );
};
