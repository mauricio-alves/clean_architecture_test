import { createFileRoute } from "@tanstack/react-router";
import { DetailsUserListPage } from "@/presentation/pages/DetailsUserListPage/DetailsUserListPage";

export const Route = createFileRoute("/details/userList")({
  component: DetailsUserListPage,
});
