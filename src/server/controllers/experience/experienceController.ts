import type { NextFunction, Request, Response } from "express";
import Experience from "../../../database/models/users/Experience.js";
import CustomError from "../../CustomError/CustomError.js";

export const getExperiencies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const experience = await Experience.find();
    res.status(200).json({ experience });
  } catch {
    const throwError = new CustomError(
      "experiencia no encontrada",
      500,
      "experiencia no encontrada"
    );
    next(throwError);
  }
};
