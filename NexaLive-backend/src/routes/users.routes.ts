import { Router } from "express";
import { usersController } from "../controllers/users.controller";

export const userRouter = Router();

userRouter.post("/", usersController.create);
userRouter.delete("/:id", usersController.deleteById);
userRouter.put("/:id", usersController.updateById);
userRouter.patch("/:id", usersController.updateById);
userRouter.get("/search", usersController.search);
userRouter.get("/", usersController.findAll);
userRouter.get("/:id", usersController.findById);