import { Routes, Route } from "react-router-dom";
import { Home } from "presentation/pages/Home/Home";
import { DetailsMoviePage } from "presentation/pages/DetailsMoviePage/DetailsMoviePage";
import { DetailsUserListPage } from "presentation/pages/DetailsUserListPage/DetailsUserListPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<DetailsMoviePage />} />
      <Route path="/details/userList" element={<DetailsUserListPage />} />
    </Routes>
  );
};
