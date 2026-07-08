import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import { Header } from "@/presentation/components/organisms/Header";
import { Footer } from "@/presentation/components/organisms/Footer";
import { UserListProvider } from "@/context/UserListContext";

export const Route = createRootRoute({
  component: () => (
    <UserListProvider>
      <Header />
      <Toaster />
      <Outlet />
      <Footer />
    </UserListProvider>
  ),
});

