import morgan from "morgan";
import express from "express";
import { generalError, unknownEndpoint } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());

app.use("/users", userRouter);

app.use(unknownEndpoint);
app.use(generalError);

export default app;
