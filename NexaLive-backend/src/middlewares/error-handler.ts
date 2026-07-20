import { request, response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../common/errors/app-error';

export function errorHandler(
    err: Error,
    _req: typeof request,
    res: typeof response,
    _next: NextFunction
) {
    if (err instanceof ZodError){
        return res.status(400).json({
            message: "Erro de validação",
            errors: err.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            })),
        });
    }

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    console.error(err);
    return res.status(500).json({ message: "Erro interno do servidor"});
}