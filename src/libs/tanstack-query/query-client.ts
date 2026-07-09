import { QueryClient } from "@tanstack/react-query";

const tanStackQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 5,
      refetchInterval: false,
    },
  },
});

export default tanStackQueryClient;
