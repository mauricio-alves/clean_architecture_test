import { ContainerModule } from "inversify";
import { InfraTokens } from "@/libs/inversifyjs/tokens/infrastructure-tokens";

import type { IHttpClient } from "@/business/domain/common/http-client";
import type { IStorageService } from "@/business/domain/common/storage-service";
import type { IConfigService } from "@/business/domain/common/config-service";

import { AxiosHttpClient } from "@/infrastructure/adapters/axios-http-client";
import { LocalStorageService } from "@/infrastructure/adapters/local-storage-service";
import { EnvConfigService } from "@/infrastructure/adapters/env-config-service";

export const infrastructureModule = new ContainerModule(({ bind }) => {
  bind<IHttpClient>(InfraTokens.IHttpClient).to(AxiosHttpClient);
  bind<IStorageService>(InfraTokens.IStorageService).to(LocalStorageService);
  bind<IConfigService>(InfraTokens.IConfigService).to(EnvConfigService);
});
