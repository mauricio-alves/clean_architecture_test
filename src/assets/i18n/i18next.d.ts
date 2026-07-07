import en from "./en.json";
import pt from "./pt.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "pt";
    resources: {
      pt: typeof pt;
      en: typeof en;
    };
  }
}
