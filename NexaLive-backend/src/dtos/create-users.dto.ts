import { z } from "zod";

export const usersSchema = z.object({
    username: z.string().min(3, "Username obrigatorio"),
    email: z.string().email("Email deve ter um dominio valido"),
    password: z.string()
        .min(12, "Senha deve ter pelo menos 12 caracteres")
        .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
        .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
        .regex(/[0-9]/, "Senha deve conter pelo menos um número"),
        // .regex(/[^a-zA-Z0-9]/, "Senha deve conter um caractere especial"),
    avatarUrl: z.string().optional(),
    bio: z.string().optional(),
});

export type CreateUserDto = z.infer<typeof usersSchema>;