import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Category name is required"),
  description: z.string().optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
