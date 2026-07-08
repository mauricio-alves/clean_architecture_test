import { Container } from "inversify";
import { infrastructureModule } from "./modules/infrastructureModule";
import { movieModule } from "./modules/movieModule";
import { userListModule } from "./modules/userListModule";

export const container = new Container({ defaultScope: "Singleton" });

container.load(infrastructureModule, movieModule, userListModule);
