import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { loginSchema } from "../dtos/login.dto";

export const authController = {
    async login(req: Request, res: Response){
        const data = loginSchema.parse(req.body);
        const result = await authService.login(data);
        return res.status(200).json(result);
    },

    async refresh(req: Request, res: Response){
        const {refreshToken} = req.body;

        if(!refreshToken || typeof refreshToken !== "string"){
            return res.status(400).json({ message: "refreshToken is required."});
        }

        const result = await authService.refresh(refreshToken);
        return res.status(200).json(result);
    },

    async logout(req: Request, res: Response){
        const {refreshToken} = req.body;

        if(!refreshToken || typeof refreshToken !== "string"){
            return res.status(200).json({ message: "refreshToken is required."});
        }

        await authService.logout(refreshToken);
        return res.status(204).send();
    },

    
};