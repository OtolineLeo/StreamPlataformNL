import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { usersRepository } from "../repositories/users.repository";
import { refreshTokenRepository } from "../repositories/refresh-token.repository";
import { toPublicUser } from "./users.service";
import { LoginDto } from "../dtos/login.dto";
import { UnauthorizedError } from "../common/errors/app-error";

// FUNÇÃO PARA GERAR TOKEN DE ACESSO
function generateAccessToken(userId: string): string {
    return jwt.sign(
        { sub: userId },
        process.env.JWT_SECRET as string,
        { expiresIn: "15m" }
    );
}

// FUNÇÃO PARA REGERAR TOKEN E MANTER O USUARIO LOGADO SEM PRECISAR LOGAR NOVAMENTE QUANDO FECHAR O NAVEGADOR
async function generateRefreshToken(userId: string){
    const token = crypto.randomBytes(40).toString("hex");

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate()+61);

    await refreshTokenRepository.create({
        token, expiresAt, userId,
    });

    return token;
}

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

        const accessToken = generateAccessToken(user.id);
        const refreshToken = await generateRefreshToken(user.id);

        return {
            accessToken,
            refreshToken,
            user: toPublicUser(user),
        };
    },

    async refresh(refreshToken: string){
        const storedToken = await refreshTokenRepository.findByToken(refreshToken)

        if(!storedToken){
            throw new UnauthorizedError("Refresh token invalido.");
        }

        if(storedToken.expiresAt < new Date()){
            throw new UnauthorizedError("Refresh token expirado.");
        }

        const accessToken = generateAccessToken(storedToken.userId);

        return { accessToken };
    },

    async logout(refreshToken: string){
        await refreshTokenRepository.deleteByToken(refreshToken);
    },
};