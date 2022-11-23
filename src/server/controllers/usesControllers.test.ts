import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import type { RegisterUser } from "./types";
import User from "../../database/models/users/User";
import registerUser from "./useControllers";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

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
