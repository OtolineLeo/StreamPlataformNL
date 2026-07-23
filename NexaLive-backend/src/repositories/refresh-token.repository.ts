import { prisma } from "../config/prisma";

type CreateRefreshToken = {
    token: string;
    expiresAt: Date;
    userId: string;
};

export const refreshTokenRepository = {
    create(data: CreateRefreshToken){
        return prisma.refreshToken.create({ data: {
            token: data.token,
            expiresAt: data.expiresAt,
            userId: data.userId
        },
      });
    },

    findByToken(token: string){
        return prisma.refreshToken.findUnique({ where: {token} });
    },

    deleteByToken(token: string){
        return prisma.refreshToken.delete({ where: {token}})
    },
};