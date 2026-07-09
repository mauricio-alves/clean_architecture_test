import { Container } from "inversify";
import { infrastructureModule } from "./modules/infrastructure-module";
import { movieModule } from "./modules/movie-module";
import { userListModule } from "./modules/user-list-module";

export const container = new Container({ defaultScope: "Singleton" });

container.load(infrastructureModule, movieModule, userListModule);
