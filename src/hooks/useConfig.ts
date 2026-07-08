import { container } from "libs/inversifyjs/container";
import { InfraTokens } from "libs/inversifyjs/tokens/infrastructureTokens";
import type { IConfigService } from "infrastructure/protocols/ConfigService";

export const useConfig = (): IConfigService => {
  return container.get<IConfigService>(InfraTokens.IConfigService);
};
