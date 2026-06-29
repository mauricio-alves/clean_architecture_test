import { Container } from "inversify";
import { infrastructureModule } from "./infrastructureModule";
import { movieModule } from "./movieModule";
import { userListModule } from "./userListModule";

export const container = new Container({ defaultScope: "Singleton" });

container.load(infrastructureModule, movieModule, userListModule);
