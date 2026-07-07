export const theme = {
  colors: {
    primary: "#02b0c8",
    primaryHover: "#0254c8",
    primaryActive: "#026cc8",
    dark: "#000023",
    success: "#058709",
    successHover: "#1cbb21",
    danger: "#c80202",
    dangerHover: "#f85d5d",
    muted: "#555555",
    white: "#ffffff",
    border: "#ccc",
    text: "#333333",
  },
} as const;

export type Theme = typeof theme;
