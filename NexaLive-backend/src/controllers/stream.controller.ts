import { Request, Response } from "express";
import { streamService } from "../services/stream.service";
import { createStreamSchema } from "../dtos/create-stream.dto";

export const streamController = {
    async start(req: Request, res: Response){
        const data = createStreamSchema.parse(req.body);
        const stream = await streamService.start(req.userId as string, data);
        return res.status(201).json(stream);
    },

    async end(req: Request, res: Response) {
        const { id } = req.params;

        if(!id || typeof id !== 'string'){
            return res.status(400).json({ message: "ID is required. "});
        }

        const stream = await streamService.end(id, req.userId as string);
        return res.status(200).json(stream);
    },

    async findById(req: Request, res: Response){
        const { id } = req.params;

        if(!id || typeof id !== "string") {
            return res.status(400).json({ message: "ID is required."});
        }

        const stream = await streamService.findById(id);
        return res.status(200).json(stream)
    },

    async findLive(req: Request, res: Response){
        const streams = await streamService.findLive();
        return res.status(200).json(streams);
    },
    
    async findCategory(req: Request, res: Response){
        const { categoryId } = req.params;

        if(!categoryId || typeof categoryId !== "string"){
            return res.status(400).json({ message: "categoryId is required."});
        }

        const streams = await streamService.findByCategory(categoryId);
        return res.status(200).json(streams);
    },
}