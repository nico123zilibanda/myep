import { z } from "zod";

export const LanguageSchema = z.object({
  language: z.enum(["sw", "en"]),
});
