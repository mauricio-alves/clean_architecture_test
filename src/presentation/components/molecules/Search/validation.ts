import { z } from "zod";

export const searchSchema = z
  .string()
  .min(1, "search.error.empty")
  .max(100, "search.error.tooLong");
