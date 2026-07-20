import express from "express";
import { categoryRouter } from "./routes/category.routes";
import { errorHandler } from "./middlewares/error-handler";

export const app = express();
app.use(express.json());
app.use("/categories", categoryRouter);

app.use(errorHandler);