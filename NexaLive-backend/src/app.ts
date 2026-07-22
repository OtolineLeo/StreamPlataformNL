import express from "express";
import { categoryRouter } from "./routes/category.routes";
import { userRouter } from "./routes/users.routes";
import { errorHandler } from "./middlewares/error-handler";
import { authRouter } from "./routes/auth.routes";

export const app = express();
app.use(express.json());
app.use("/categories", categoryRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use(errorHandler);