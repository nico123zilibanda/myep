// lib/validators/category.ts

import { z } from "zod";

export const CategorySchema = z.object({
  name: z
    .string()
    .min(2, "Jina la category lazima liwe angalau herufi 2"),

  description: z
    .string()
    .optional()
    .nullable(),
});

export type CategoryInput = z.infer<typeof CategorySchema>;
