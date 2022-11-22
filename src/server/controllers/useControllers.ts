import type { NextFunction, Request, Response } from "express";
import User from "../../database/models/users/users";
import { RegisterUser } from "./types";

const RegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email } = req.body as RegisterUser;

  const user = await User.create({ username, email, password });
};
