import { streamRepository } from "../repositories/stream.repository";
import { categoryRepository } from "../repositories/category.repository";
import { CreateStreamDto } from "../dtos/create-stream.dto";
import { NotFoundError, UnauthorizedError } from "../common/errors/app-error";

export const streamService = {
    async start(userId: string, data: CreateStreamDto) {
        // PARA CONFIRMAR SE EXISTE ANTES DE CRIAR A STREAM
        const category = await categoryRepository.findById(data.categoryId);

        if(!category) {
            throw new NotFoundError("Categoria não encontrada.");
        }
        // PARA CRIAR A STREAM
        const stream = await streamRepository.create({
            ...data,
            userId,
            isLive: true,
            startedAt: new Date(),
        });

        return stream;
    },

    async end(id: string, userId: string) {
        const stream = await streamRepository.findById(id);

        if(!stream){
            throw new NotFoundError("Stream não encontrada.");
        }

        if(stream.userId !== userId) {
            throw new UnauthorizedError("Você não pode encerrar essa stream.")
        }
        // PARA ENCERRAR A STREAM
        const endedStream = await streamRepository.endById(id);
        return endedStream;
    },

    async findById(id: string){
        const stream = await streamRepository.findById(id);

        if(!stream) {
            throw new NotFoundError("Stream não encontrada.");
        }

        return stream;
    },

    async findLive(){
        const streams = await streamRepository.findLive();
        return streams;
    },

    async findByCategory(categoryId: string){
        const streams = await streamRepository.findByCategory(categoryId);
        return streams;
    },
};