export interface IHttpClient {
  get<T>(url: string, config?: { params?: Record<string, any> }): Promise<T>;
}
