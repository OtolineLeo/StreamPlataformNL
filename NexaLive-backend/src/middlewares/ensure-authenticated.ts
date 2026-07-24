import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../common/errors/app-error";

interface TokenPaylord {
    sub: string;
}

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        throw new UnauthorizedError("Token não enviado");
    }

    const [, token] = authHeader.split(" ");

    if(!token) {
        throw new UnauthorizedError("Token mal formatado");
    }

    try {
        const payloard = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPaylord;
        req.userId = payloard.sub;
        return next();
    } catch {
        throw new UnauthorizedError("Token invalido ou expirado");
    }
}