import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import type { Credentials, RegisterUser } from "./types";
import User from "../../database/models/users/User";
import { loginUser, registerUser } from "./useControllers";
import jwt from "jsonwebtoken";
import { loginErrors } from "../CustomError/errors";
const req: Partial<Request> = {};

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

const token = jwt.sign({}, "tokensecret");

describe("Given a registerUser controller", () => {
  describe("When it receives a request with username 'hulio', password '1234567', and email 'hulio@gmail.com'", () => {
    test("Then its method status should be called with a  status 201 ", async () => {
      const expectedStatusCode = 201;
      const registerData: RegisterUser = {
        username: "hulio",
        password: "1234567",
        email: "papirrin@.com",
      };
      const req: Partial<Request> = {
        body: registerData,
      };
      const hashedPassword = "1234567hashed";
      const userId = new mongoose.Types.ObjectId();
      const expectedMessage = { message: `${registerData.username} registred` };

      bcrypt.hash = jest.fn().mockResolvedValue(hashedPassword);
      User.create = jest.fn().mockResolvedValue({
        ...registerData,
        password: hashedPassword,
        _id: userId,
      });

      await registerUser(req as Request, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When it receives a request with username 'hulio', password '1234567', and email 'hulio@gmail.com' and it already is in the database", () => {
    test("Then it should call the next function with a CustomError", async () => {
      const registerData: RegisterUser = {
        username: "hulio",
        password: "1234567",
        email: "hulio@gmail.com",
      };
      const req: Partial<Request> = {
        body: registerData,
      };
      const next = jest.fn();
      const error = new Error("");

      User.create = jest.fn().mockRejectedValue(error);

      await registerUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a loginUser controller", () => {
  describe("When it receives with username 'xavi' and password 'xavi' in the body and a response", () => {
    test("Then it should invoke response's status metohd with 200 and json with a token", async () => {
      const userCredentials: Credentials = {
        username: "xavi",
        password: "xavi",
      };

      const userId = new mongoose.Types.ObjectId();
      const expectStatus = 200;
      req.body = userCredentials;
      User.findOne = jest
        .fn()
        .mockResolvedValue({ ...userCredentials, _id: userId });

      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue(token);

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectStatus);
      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives a request with username 'xavi' and password 'xavi' in the body and the password is incorrect", () => {
    test("Then it invoke a error with this public message:'username incorrect'", async () => {
      const userCredentials: Credentials = {
        username: "xavi",
        password: "xavi",
      };

      const userId = new mongoose.Types.ObjectId();
      req.body = userCredentials;
      User.findOne = jest
        .fn()
        .mockResolvedValueOnce({ ...userCredentials, id: userId });
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginUser(req as Request, null, next as NextFunction);

      expect(next).toHaveBeenCalledWith(loginErrors.incorrectPassword);
    });
  });

  describe("When it receives a request with username 'gaspar' which is not registered in the data base ", () => {
    test("Then it should invoke next with a CustomError with public message:'usuario incorrecto o password incorrecta'", async () => {
      const userCredentials: Credentials = {
        username: "gaspar",
        password: "1234567",
      };

      req.body = userCredentials;
      User.findOne = jest.fn().mockResolvedValue(null);

      await loginUser(req as Request, null, next as NextFunction);

      expect(next).toHaveBeenCalledWith(loginErrors.userNotFound);
    });
  });
});
