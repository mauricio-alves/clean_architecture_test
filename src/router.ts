import { createRouter } from "@tanstack/react-router";
import { NotFound } from "@/presentation/components/molecules/NotFound";
import { routeTree } from "@/routeTree.gen";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({
  routeTree,
  basepath: import.meta.env.BASE_URL,
  defaultNotFoundComponent: () => NotFound(),
});

export { router };

