import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { usersRepository } from "../repositories/users.repository";
import { toPublicUser } from "./users.service";
import { LoginDto } from "../dtos/login.dto";
import { UnauthorizedError } from "../common/errors/app-error";

export const authService = {
    async login(data: LoginDto){
        // BUSCA USUARIO, SE NÃO ACHAR RETORNA O ERRO.
        const user = await usersRepository.findByEmail(data.email);

        if(!user){
            throw new UnauthorizedError("Email ou senha invalidos.");
        }

        const passwordMatches = await bcrypt.compare(data.password, user.passwordHash);

        if(!passwordMatches) {
            throw new UnauthorizedError("Email ou senha invalidos.");
        }

        const token = jwt.sign(
            { sub: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d"}
        );

        return {
            token,
            user: toPublicUser(user),
        };
    },
};