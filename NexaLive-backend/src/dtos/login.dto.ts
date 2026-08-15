import { z } from "zod";

export const loginSchema = z.object({
    identifier: z.string().min(1, "Username ou email é obrigatorio"),
    password: z.string().min(1, "Senha é obrigatoria"),
});

export type LoginDto = z.infer<typeof loginSchema>;