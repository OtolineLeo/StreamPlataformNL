import { Router } from "express";
import { categoryController } from "../controllers/category.controller";

export const categoryRouter = Router();

categoryRouter.post("/", categoryController.create);
categoryRouter.delete("/:id", categoryController.deleteById);
categoryRouter.put("/:id", categoryController.updateById);
categoryRouter.get("/search", categoryController.search);
categoryRouter.get("/slug/:slug", categoryController.findBySlug);