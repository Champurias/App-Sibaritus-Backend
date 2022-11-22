import morgan from "morgan";
import express from "express";
import { generalError, unknownEndpoint } from "./middlewares/error.js";

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(unknownEndpoint);
app.use(generalError);

export default app;
