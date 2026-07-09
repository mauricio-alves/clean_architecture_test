export type HttpGetParams = {
  url: string;
  params?: Record<string, any>;
  headers?: Record<string, string>;
};

export type HttpResponse<T> = {
  statusCode: number;
  body: T;
};

export interface IHttpClient {
  get<T>(params: HttpGetParams): Promise<HttpResponse<T>>;
}
