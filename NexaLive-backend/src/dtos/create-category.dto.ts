import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string().min(1, "Nome é obrigatorio"),
    coverUrl: z.string().url("CoverUrl deve ser uma URL válida"),
    description: z.string().optional(),
});

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;