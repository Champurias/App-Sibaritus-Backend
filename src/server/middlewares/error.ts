import enviroment from "../../loadEnviroment.js";
import debugCreator from "debug";
import chalk from "chalk";
import type CustomError from "../patata/patata.js";
import type { Request, Response, NextFunction } from "express";

const debug = debugCreator(`${enviroment.debug}middlewares`);

export const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).json({ message: "Endpoint not found" });
  debug(chalk.red("Endpooint not found"));
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(chalk.red(`Error ${error.message}`));
  const status = error.state ?? 500;
  const message = error.customMessage || "General error";

  res.status(status).json({ error: message });
  next();
};
