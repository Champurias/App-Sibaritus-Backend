import express from "express";
import { validate } from "express-validation";
import { loginUserSchema, userSchema } from "../../schemas/userSchema.js";

import { loginUser, registerUser } from "../controllers/useControllers.js";

// eslint-disable-next-line new-cap
export const userRouter = express.Router();

userRouter.post(
  "/register",
  validate(userSchema, {}, { abortEarly: false }),
  registerUser
);

export default userRouter;

userRouter.post(
  "/login",
  validate(loginUserSchema, {}, { abortEarly: false }),
  loginUser
);
