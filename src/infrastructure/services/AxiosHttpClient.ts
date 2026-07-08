import { injectable } from "inversify";
import axios, { AxiosInstance } from "axios";
import { HttpGetParams, HttpResponse, IHttpClient } from "infrastructure/protocols/HttpClient";
import { requestInterceptor } from "infrastructure/interceptors/request";
import { responseInterceptor } from "infrastructure/interceptors/response";

@injectable()
export class AxiosHttpClient implements IHttpClient {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create();
    requestInterceptor(this.client);
    responseInterceptor(this.client);
  }

  async get<T>(params: HttpGetParams): Promise<HttpResponse<T>> {
    const response = await this.client.get<T>(params.url, {
      params: params.params,
      headers: params.headers,
    });
    return {
      statusCode: response.status,
      body: response.data,
    };
  }
}
