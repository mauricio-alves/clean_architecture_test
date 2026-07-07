import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "@/presentation/components/organisms/Header/Header";
import { Footer } from "@/presentation/components/organisms/Footer/Footer";
import { UserListProvider } from "@/presentation/context/UserListContext";

export const Route = createRootRoute({
  component: () => (
    <UserListProvider>
      <Header />
      <Outlet />
      <Footer />
    </UserListProvider>
  ),
});
