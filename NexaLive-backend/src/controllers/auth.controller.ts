import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { loginSchema } from "../dtos/login.dto";

export const authController = {
    async login(req: Request, res: Response){
        const data = loginSchema.parse(req.body);
        const result = await authService.login(data);
        return res.status(200).json(result);
    },
};