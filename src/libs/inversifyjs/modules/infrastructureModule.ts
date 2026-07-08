import { ContainerModule } from "inversify";
import { InfraTokens } from "libs/inversifyjs/tokens/infrastructureTokens";

import type { IHttpClient } from "infrastructure/protocols/HttpClient";
import type { IStorageService } from "infrastructure/protocols/StorageService";
import type { IConfigService } from "infrastructure/protocols/ConfigService";

import { AxiosHttpClient } from "@/infrastructure/services/AxiosHttpClient";
import { LocalStorageService } from "@/infrastructure/services/LocalStorageService";
import { EnvConfigService } from "@/infrastructure/services/EnvConfigService";

export const infrastructureModule = new ContainerModule(({ bind }) => {
  bind<IHttpClient>(InfraTokens.IHttpClient).to(AxiosHttpClient);
  bind<IStorageService>(InfraTokens.IStorageService).to(LocalStorageService);
  bind<IConfigService>(InfraTokens.IConfigService).to(EnvConfigService);
});
