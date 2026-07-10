import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";

export default defineConfig({
  envPrefix: ["VITE_"],
  esbuild: {
    target: "esnext",
  },
  plugins: [
    TanStackRouterVite({
      routesDirectory: "./src/presentation/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react({
      babel: {
        plugins: [["babel-plugin-transform-typescript-metadata"], ["@babel/plugin-proposal-decorators", { legacy: true }], ["@babel/plugin-proposal-class-properties", { loose: true }]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
    },
  },
  build: {
    target: "esnext",
  },
});
