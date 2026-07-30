import { Router } from "express";
import { streamController } from "../controllers/stream.controller";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";

export const streamRoutes = Router();

streamRoutes.post("/", ensureAuthenticated, streamController.start);
streamRoutes.patch("/:id/end", ensureAuthenticated, streamController.end);

streamRoutes.get("/live", streamController.findLive);
streamRoutes.get("/category/:categoryId", streamController.findCategory);
streamRoutes.get("/:id", streamController.findById);