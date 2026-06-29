import { AxiosInstance } from "axios";

export const registerResponseInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(
    (response) => {
      console.log(`[HTTP Response] ${response.status} ${response.config.url}`);
      return response;
    },
    (error) => {
      if (error.response) {
        const { status } = error.response;
        console.error(`[HTTP Response Error] ${status} ${error.config.url}`, error.response.data);
        if (status === 401) {
          return Promise.reject(new Error("Acesso não autorizado! Verifique sua chave de API do TMDb."));
        }
        if (status === 404) {
          return Promise.reject(new Error("O recurso solicitado não foi encontrado."));
        }
        if (status >= 500) {
          return Promise.reject(new Error("Erro no servidor da API. Tente novamente mais tarde."));
        }
      } else if (error.request) {
        console.error("[HTTP Network Error] Sem resposta do servidor", error.request);
        return Promise.reject(new Error("Erro de conexão de rede. Verifique sua internet."));
      } else {
        console.error("[HTTP Error]", error.message);
      }
      return Promise.reject(error);
    }
  );
};
