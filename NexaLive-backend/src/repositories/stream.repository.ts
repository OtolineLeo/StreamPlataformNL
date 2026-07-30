import { prisma } from "../config/prisma";
import { CreateStreamDto } from "../dtos/create-stream.dto";

type CreateStreamData = CreateStreamDto & {
    userId: string;
    isLive: boolean;
    startedAt: Date;
};

export const streamRepository = {
    create(data: CreateStreamData) {
        return prisma.stream.create({ data });
    },

    findById(id: string) {
        return prisma.stream.findUnique({ where: {id}});
    },

    findAll() {
        return prisma.stream.findMany();
    },

    findByCategory(categoryId: string) {
        return prisma.stream.findMany({ where: { categoryId }})
    },

    findLive() {
        return prisma.stream.findMany({ where: {isLive: true} });
    },

    endById(id: string) {
        return prisma.stream.update({
            where: { id },
            data: {
                isLive: false,
                endedAt: new Date(),
            },
        });
    },


};

