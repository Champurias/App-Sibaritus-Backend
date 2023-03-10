import type { NextFunction, Request, Response } from "express";
import { Experience } from "../../../database/models/users/Experience.js";

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

export const deleteExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { experienceId } = req.params;
    const deleteExperience = await Experience.findByIdAndDelete(experienceId);

    res.status(200).json(deleteExperience);
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      404,
      "Experiencia no encontrada"
    );
    next(customError);
  }
};

export const createExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newExperience = await Experience.create(req.body);

    res.status(201).json(newExperience);
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      404,
      "No se ha podido crear la experiencia"
    );
    next(customError);
  }
};

export const getExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { experienceId } = req.params;

  try {
    const experience = await Experience.findById(experienceId);

    if (!experience) {
      const customError = new CustomError(
        "Experiencia no encontrada",
        404,
        "Experiencia no encontrada"
      );
      next(customError);
      return;
    }

    res.status(200).json(experience);
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      400,
      "Experiencia no encontrada"
    );
    next(customError);
  }
};
