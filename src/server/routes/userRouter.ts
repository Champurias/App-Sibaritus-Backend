import express from "express";
import { validate } from "express-validation";
import userSchema from "../../schemas/userSchema.js";
import registerUser from "../controllers/useControllers.js";

// eslint-disable-next-line new-cap
const userRouter = express.Router();

userRouter.post(
  "/register",
  validate(userSchema, {}, { abortEarly: false }),
  registerUser
);

export default userRouter;
