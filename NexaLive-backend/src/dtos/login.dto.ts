import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(1, "Username é obrigatorio"),
    password: z.string().min(1, "Senha é obrigatoria"),
});

export type LoginDto = z.infer<typeof loginSchema>;