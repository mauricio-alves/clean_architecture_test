import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  envPrefix: ["VITE_"],
  esbuild: {
    target: "esnext",
  },
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-transform-typescript-metadata"], ["@babel/plugin-proposal-decorators", { legacy: true }], ["@babel/plugin-proposal-class-properties", { loose: true }]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      domain: path.resolve(__dirname, "./src/domain"),
      data: path.resolve(__dirname, "./src/data"),
      libs: path.resolve(__dirname, "./src/libs"),
      infrastructure: path.resolve(__dirname, "./src/infrastructure"),
      context: path.resolve(__dirname, "./src/presentation/context"),
      hooks: path.resolve(__dirname, "./src/presentation/hooks"),
      presentation: path.resolve(__dirname, "./src/presentation"),
      assets: path.resolve(__dirname, "./src/assets"),
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
