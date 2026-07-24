import { Request, Response } from "express";
import { usersService } from "../services/users.service";
import { usersSchema } from "../dtos/create-users.dto";

export const updateUserSchema = usersSchema.omit({ password: true}).partial();

export const usersController = {

    async create(req: Request, res: Response) {
        const data = usersSchema.parse(req.body);
        const users = await usersService.create(data);
        return res.status(201).json(users)
    },

    async deleteById(req: Request, res: Response) {
        const {id} = req.params;

        if(!id || typeof id !== 'string') {
            return res.status(400).json({message: "ID is required."});
        }

        if(req.userId !== id){
            return res.status(403).json({ message: "Você só pode alterar o seu proprio perfil."})
        }

        const deletedUsers = await usersService.deleteById(id);
        return res.status(200).json(deletedUsers);
    },

    async updateById(req: Request, res: Response) {
        const {id} = req.params;

        if(!id || typeof id !== 'string') {
            return res.status(400).json({ message: "ID is required."});
        }

        if(req.userId !== id){
            return res.status(403).json({ message: "Você só pode alterar seu proprio perfil."});
        }

        const data = updateUserSchema.parse(req.body)
        const updatedUsers = await usersService.updateById(id, data);
        return res.status(200).json(updatedUsers);
    },

    async search(req: Request, res: Response) {
        const {q} = req.query;

        if(!q || typeof q !== "string") {
            return res.status(400).json({message: "Query is required."})
        }

        const users = await usersService.search(q);
        return res.status(200).json(users)
    },

    async findById(req: Request, res: Response) {
        const {id} = req.params;

        if(!id || typeof id !== 'string') {
            return res.status(400).json({message: "ID is required."});
        }

        const users = await usersService.findById(id);
        return res.status(200).json(users)
    },

    async findAll(req: Request, res: Response) {
        const users = await usersService.findAll();
        return res.status(200).json(users);
    }
}