import { AxiosInstance } from "axios";

export const requestInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      console.error("[HTTP Request Error]", error);
      return Promise.reject(error);
    }
  );
};
