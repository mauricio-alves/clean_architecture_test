import "styled-components";
import { Colors as Theme } from "./colors";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: Theme;
  }
}
