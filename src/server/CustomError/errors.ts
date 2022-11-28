import CustomError from "./CustomError";

export const loginErrors = {
  userNotFound: new CustomError(
    "usuario incorrecto",
    401,
    "usuario incorrecto o password incorrecta"
  ),

  incorrectPassword: new CustomError(
    "Password incorrecta",
    401,
    "usuario incorrecto o password incorrecta"
  ),
};
