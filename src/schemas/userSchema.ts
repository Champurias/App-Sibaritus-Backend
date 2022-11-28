import { Joi } from "express-validation";

export const userSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
  }),
};

export const loginUserSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(4).required(),
  }),
};
