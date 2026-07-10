import { container } from "@/libs/inversifyjs/container";
import { InfraTokens } from "@/libs/inversifyjs/tokens/infrastructure-tokens";
import type { IConfigService } from "@/business/domain/common/config-service";

export const useConfig = (): IConfigService => {
  return container.get<IConfigService>(InfraTokens.IConfigService);
};
