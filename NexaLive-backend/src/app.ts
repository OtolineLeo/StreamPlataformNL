import express from "express";
import { categoryRouter } from "./routes/category.routes";

export const app = express();
app.use(express.json());
app.use("/categories", categoryRouter);