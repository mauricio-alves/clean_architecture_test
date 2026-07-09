import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "@/presentation/components/organisms/Header";
import { Footer } from "@/presentation/components/organisms/Footer";

import { AppToaster } from "../components/atoms/Toast";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <AppToaster />
      <Outlet />
      <Footer />
    </>
  ),
});
