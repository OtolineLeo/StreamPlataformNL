import { z } from "zod";

export const createStreamSchema = z.object({
    categoryId: z.string().uuid("categoryId deve ser um UUID válido"),
    title: z.string()
        .min(5, "O titulo deve conter mais de 5 caracteres")
        .max(50, "O titulo não deve passar de 50 caracteres"),
    thumbnailUrl: z.string().url("thumbnailUrl deve ser uma URL valida").optional(),
});

export type CreateStreamDto = z.infer<typeof createStreamSchema>;