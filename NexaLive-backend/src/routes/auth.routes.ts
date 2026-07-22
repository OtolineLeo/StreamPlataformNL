import { Router } from "express";
import { authController } from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/login", authController.login);

//PODE ENTRAR O REGISTER AQUI - PARA QUANDO REGISTRAR UM USUARIO NOVO