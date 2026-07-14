import { Request, Response } from "express";
import { categoryService } from "../services/category.service";

export const categoryController = {
    async create(req: Request, res: Response) {
        const category = await categoryService.create(req.body);
        return res.status(201).json(category);
    },

    async deleteById(req: Request, res: Response) {
        const {id} = req.params;

        if (!id || typeof id !== 'string') {
            return res.status(400).json({ message: "ID is required." });
        }

        const deletedCategory = await categoryService.deleteById(id);
        return res.status(200).json(deletedCategory);
    },

    async updateById(req: Request, res: Response) {
        const {id} = req.params;

        if (!id || typeof id !== 'string') {
            return res.status(400).json({ message: "ID is required." });
        }

        const updatedCategory = await categoryService.updateById(id, req.body);
        return res.status(200).json(updatedCategory);
    },

    async search(req: Request, res: Response) {
        const { q } = req.query;

        if (!q || typeof q !== 'string') {
            return res.status(400).json({ message: "Valid query is required." });
        }

        const categories = await categoryService.search(q);
        return res.status(200).json(categories);
    },

    // APENAS PARA USO INTERNO, PARA ENCONTRAR UMA CATEGORIA PELO ID
    async findById(req: Request, res: Response) {
        const {id} = req.params;   
    
        if (!id || typeof id !== 'string') {
            return res.status(400).json({ message: "ID is required." });
        }

        const category = await categoryService.findById(id);
        return res.status(200).json(category);
    },

    // USADO EXTERNO PARA ENCONTRAR UMA CATEGORIA PELO SLUG
    async findBySlug(req: Request, res: Response) {
        const {slug} = req.params;

        if (!slug || typeof slug !== 'string') {
            return res.status(400).json({ message: "Valid slug is required." });
        }

        const category = await categoryService.findBySlug(slug);
        return res.status(200).json(category);
    }
};

