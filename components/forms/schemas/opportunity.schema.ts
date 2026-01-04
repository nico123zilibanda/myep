import { z } from "zod";

export const opportunitySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),

  description: z.string().min(10, "Description is required"),

  requirements: z.string().min(5, "Requirements are required"),

  howToApply: z.string().min(5, "How to apply is required"),

  deadline: z
    .string()
    .refine(val => !isNaN(Date.parse(val)), {
      message: "Invalid deadline date",
    }),

  location: z.string().min(2, "Location is required"),

  attachmentUrl: z.string().url("Invalid URL").optional().or(z.literal("")),

  status: z.enum(["PUBLISHED", "DRAFT", "CLOSED"]),

  categoryId: z.number().int().positive("Category is required"),
});

export type OpportunityFormData = z.infer<typeof opportunitySchema>;
