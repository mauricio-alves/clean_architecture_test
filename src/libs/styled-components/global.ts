import { createGlobalStyle } from "./index";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Segoe UI Variable", "Segoe UI", Helvetica, Arial, sans-serif;
    line-height: 1.5;
  }

  body {
    margin: 0 auto;
    background-color: #ffffff;
    color: #333333;
  }
`;
