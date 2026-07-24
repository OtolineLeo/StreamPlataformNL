import { Router } from "express";
import { usersController } from "../controllers/users.controller";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";

export const userRouter = Router();

userRouter.post("/", usersController.create);
userRouter.delete("/:id", ensureAuthenticated, usersController.deleteById);
// userRouter.put("/:id", usersController.updateById);
userRouter.patch("/:id", ensureAuthenticated, usersController.updateById);
userRouter.get("/search", usersController.search);
userRouter.get("/", usersController.findAll);
userRouter.get("/:id", usersController.findById);
