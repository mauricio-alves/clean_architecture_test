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
      business: path.resolve(__dirname, "./src/business"),
      infrastructure: path.resolve(__dirname, "./src/infrastructure"),
      libs: path.resolve(__dirname, "./src/libs"),
      context: path.resolve(__dirname, "./src/context"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      presentation: path.resolve(__dirname, "./src/presentation"),
      assets: path.resolve(__dirname, "./src/assets"),
      utils: path.resolve(__dirname, "./src/utils"),
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
