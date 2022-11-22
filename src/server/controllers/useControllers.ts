import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../database/models/users/users.js";
import CustomError from "../CustomError/CustomError.js";
import type { RegisterUser } from "./types.js";

const registerUser = async (
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

    res.status(201).json({ message: `${user.username} registred` });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "General error"
    );

    next(customError);
  }
};

export default registerUser;
