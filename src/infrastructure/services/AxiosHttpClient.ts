import { injectable } from "inversify";
import axios, { AxiosInstance } from "axios";
import { IHttpClient } from "data/protocols/IHttpClient";
import { registerRequestInterceptor } from "../interceptors/request";
import { registerResponseInterceptor } from "../interceptors/response";

@injectable()
export class AxiosHttpClient implements IHttpClient {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create();
    registerRequestInterceptor(this.client);
    registerResponseInterceptor(this.client);
  }

  async get<T>(url: string, config?: { params?: Record<string, any> }): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }
}
