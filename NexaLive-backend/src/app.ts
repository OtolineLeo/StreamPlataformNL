import express from "express";
import cors from "cors";
import { categoryRouter } from "./routes/category.routes";
import { userRouter } from "./routes/users.routes";
import { errorHandler } from "./middlewares/error-handler";
import { authRouter } from "./routes/auth.routes";
import { streamRoutes } from "./routes/stream.routes";
import { followRouter } from "./routes/follow.routes";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/categories", categoryRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/streams", streamRoutes);
app.use("/follows", followRouter);

app.use(errorHandler);