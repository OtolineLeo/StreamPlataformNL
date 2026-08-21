import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { categoryRouter } from "./routes/category.routes";
import { userRouter } from "./routes/users.routes";
import { errorHandler } from "./middlewares/error-handler";
import { authRouter } from "./routes/auth.routes";
import { streamRoutes } from "./routes/stream.routes";
import { followRouter } from "./routes/follow.routes";

export const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());

app.use("/categories", categoryRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/streams", streamRoutes);
app.use("/follows", followRouter);

app.use(errorHandler);