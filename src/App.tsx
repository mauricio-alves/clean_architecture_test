import { Header } from "presentation/components/organisms/Header/Header";
import { Footer } from "presentation/components/organisms/Footer/Footer";
import { AppRoutes } from "presentation/routes";
import { UserListProvider } from "context/UserListContext";

export function App() {
  return (
    <UserListProvider>
      <Header />
      <AppRoutes />
      <Footer />
    </UserListProvider>
  );
}
