import { createFileRoute } from "@tanstack/react-router";
import { DetailsMoviePage } from "@/presentation/pages/DetailsMoviePage";

export const Route = createFileRoute("/details/$id")({
  component: DetailsMoviePage,
});

