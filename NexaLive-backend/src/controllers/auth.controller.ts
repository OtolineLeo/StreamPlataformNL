import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { loginSchema } from "../dtos/login.dto";

const REFRESH_TOKEN_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: false, // mudar para true quando sair de localhost
    sameSite: "lax" as const,
    maxAge: 61 * 24 * 60 * 60 * 1000,
}

export const authController = {
    async login(req: Request, res: Response){
        const data = loginSchema.parse(req.body);
        const result = await authService.login(data);

        res.cookie("refreshToken", result.refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

        return res.status(200).json({
            accessToken: result.accessToken,
            user: result.user,
        });
    },

    async refresh(req: Request, res: Response){
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken){
            return res.status(401).json({ message: "Refresh token não encontrado."})
        }

        const result = await authService.refresh(refreshToken);
        return res.status(200).json(result);
    },

    async logout(req: Request, res: Response){
        const refreshToken = req.cookies.refreshToken;

        if(refreshToken){
            await authService.logout(refreshToken);
        }

        res.clearCookie("refreshToken", REFRESH_TOKEN_COOKIE_OPTIONS);
        return res.status(204).send();
    },    
};