export interface IConfigService {
  getApiKey(): string;
  getBaseUrl(): string;
  getBaseImgUrl(): string;
  getBackdropImgUrl(): string;
  getLanguage(): string;
}
