import { ContainerModule } from "inversify";
import { TOKENS } from "libs/inversifyjs/tokens";

import type { IHttpClient } from "data/protocols/HttpClient";
import type { IStorageService } from "data/protocols/StorageService";
import type { IConfigService } from "data/protocols/ConfigService";

import { AxiosHttpClient } from "@/infrastructure/services/AxiosHttpClient";
import { LocalStorageService } from "@/infrastructure/services/LocalStorageService";
import { EnvConfigService } from "@/infrastructure/services/EnvConfigService";

export const infrastructureModule = new ContainerModule(({ bind }) => {
  bind<IHttpClient>(TOKENS.IHttpClient).to(AxiosHttpClient);
  bind<IStorageService>(TOKENS.IStorageService).to(LocalStorageService);
  bind<IConfigService>(TOKENS.IConfigService).to(EnvConfigService);
});
