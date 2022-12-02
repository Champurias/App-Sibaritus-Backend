import type { NextFunction, Request, Response } from "express";
import Experience from "../../../database/models/users/Experience";
import { mockExperience } from "../../../mock/mockExperience";
import CustomError from "../../CustomError/CustomError";
import { deleteExperience, getExperiencies } from "./experienceController";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn().mockReturnThis();

describe("Given a getExperience controllers", () => {
  describe("When it receives a response return list of experience", () => {
    test("Then it should call its method status 200", async () => {
      const expectStatus = 200;

      Experience.find = jest.fn();

      await getExperiencies(null, res as Response, null);

      expect(res.status).toHaveBeenLastCalledWith(expectStatus);
    });
  });
  describe("When it receives a response with an  error", () => {
    test("Then it should call the next funtion with a customError", async () => {
      const customError = new CustomError(
        "experiencia no encontrada",
        500,
        "experience no encontrada"
      );

      Experience.find = jest.fn().mockRejectedValue(customError);
      await getExperiencies(null, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});

describe("Given a deleteExperience controller", () => {
  describe("When it recieves a request with experienceId", () => {
    test("Then it should return a response and call its method status code 200 and method json", async () => {
      const expectedStatus = 200;
      const expectedToDelete = mockExperience;
      const req: Partial<Request> = {
        params: { experienceId: mockExperience._id },
      };
      Experience.findByIdAndDelete = jest
        .fn()
        .mockReturnValue(expectedToDelete);

      await deleteExperience(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedToDelete);
    });
  });
  describe("When it receives a request without any experienceId", () => {
    test("Then next function should be called with a Custom error with public message 'experiencia no encontrada'", async () => {
      const req: Partial<Request> = {
        params: { experienceId: mockExperience._id },
      };
      const expectedError = new CustomError(
        "experiencia no encontrada",
        404,
        "experiencia no encontrada"
      );

      Experience.findByIdAndDelete = jest
        .fn()
        .mockRejectedValueOnce(expectedError);

      await deleteExperience(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
