import { createRouter, NotFoundRoute } from "@tanstack/react-router";
import { NotFound } from "@/presentation/components/molecules/NotFound";
import { Route as rootRoute } from "@/presentation/routes/__root";
import { routeTree } from "@/routeTree.gen";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFound,
});

const router = createRouter({
  routeTree,
  notFoundRoute,
  basepath: import.meta.env.BASE_URL,
});

export { router };
