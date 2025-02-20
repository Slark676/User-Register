import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({ message: "Title is required" }),
  description: z.string({ message: "Description is required" }),
  date: z.string().datetime().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string({ message: "Title is required" }),
  description: z.string({ message: "Description is required" }).optional(),
  date: z.string().datetime().optional(),
});
