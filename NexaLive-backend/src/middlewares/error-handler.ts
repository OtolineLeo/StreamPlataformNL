import { request, response, NextFunction } from 'express';
import { AppError } from '../common/errors/app-error';

export function errorHandler(
    err: Error,
    req: typeof request,
    res: typeof response,
    next: NextFunction
) {
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }

    console.error(err);
    return res.status(500).json({
        message: 'Internal Server Error'
    });
}