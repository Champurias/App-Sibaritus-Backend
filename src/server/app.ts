import morgan from "morgan";
import express from "express";
import { generalError, unknownEndpoint } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import cors from "cors";
import { experienceRouter } from "./routes/experienceRoutes.js";

const app = express();
app.use(
  cors({
    origin: [
      "https://david-cuartas-front-final-202209.netlify.app",
      "http://localhost:3000",
      "http://localhost:4007",
    ],
  })
);

app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());

app.use("/users", userRouter);

app.use("/experience", experienceRouter);

app.use(unknownEndpoint);
app.use(generalError);

export default app;
