import { container } from "libs/inversifyjs/container";
import { TOKENS } from "libs/inversifyjs/tokens";
import type { IConfigService } from "data/protocols/IConfigService";

export const useConfig = (): IConfigService => {
  return container.get<IConfigService>(TOKENS.IConfigService);
};
