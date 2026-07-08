import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/presentation/pages/Home";

export const Route = createFileRoute("/")({
  component: Home,
});

