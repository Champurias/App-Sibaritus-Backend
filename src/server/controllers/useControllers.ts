import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../database/models/users/users";
import type { UserResponse } from "./types";
import { RegisterUser } from "./types";
import CustomError from "../CustomError/CustomError";

const RegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email } = req.body as RegisterUser;
  try {
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    res.status(201).json({ messsage: `${user.username} registred` });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "General error"
    );

    next(customError);
  }
};
