import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/context/theme";
import { GlobalStyle } from "libs/styled-components/global";
import tanStackQueryClient from "@/libs/tanstack-query/query-client";
import "reflect-metadata";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./assets/i18n";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider>
        <I18nextProvider i18n={i18n}>
          <QueryClientProvider client={tanStackQueryClient}>
            <GlobalStyle />
            <RouterProvider router={router} />
          </QueryClientProvider>
        </I18nextProvider>
      </ThemeProvider>
    </StrictMode>,
  );
}
