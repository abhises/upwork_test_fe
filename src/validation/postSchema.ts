// validation/postSchema.ts
import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export type PostSchema = z.infer<typeof postSchema>;
