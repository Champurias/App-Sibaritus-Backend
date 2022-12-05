import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { Experience } from "../../../database/models/users/Experience";
import { mockExperience } from "../../../mocks/mockExperience";
import CustomError from "../../CustomError/CustomError";
import {
  createExperience,
  deleteExperience,
  getExperience,
  getExperiencies,
} from "./experienceController";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const req: Partial<Request> = {};

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

describe("Given a createExperience controller", () => {
  describe("When it receives a request body with desired parameters", () => {
    test("Then is should call its method with status 200", async () => {
      const expectedStatus = 201;
      const experience = mockExperience;

      const req: Partial<Request> = {
        body: experience,
      };

      Experience.create = jest.fn().mockResolvedValue(experience);

      await createExperience(
        req as Request,
        res as Response,
        next as NextFunction
      );
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
  describe("When it receives a response with an error", () => {
    test("Then it should call teh text function with a customError", async () => {
      const customError = new CustomError(
        "",
        500,
        "no se ha podido crear la experiencia"
      );
      const req: Partial<Request> = {
        body: {},
      };
      Experience.create = jest.fn().mockRejectedValue(customError);
      await createExperience(
        req as Request,
        res as Response,
        next as NextFunction
      );
      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});

describe("Given a getExperienceId", () => {
  describe("When it recieves a request with a venueId in it's body", () => {
    test("Then it should return a response and call its status method with 200 and its json method found venue", async () => {
      const expectedStatus = 200;
      const idToFind = new mongoose.Types.ObjectId();
      const experienceToFind = getExperience;
      req.params = { exprienceId: idToFind.toString() };

      Experience.findById = jest.fn().mockResolvedValueOnce(experienceToFind);

      await getExperience(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(experienceToFind);
    });
  });
  describe("When it receives a request with a wrong ExperienceId in it's body", () => {
    test("Then next function should be called with a noexperienceFpund error", async () => {
      const expectedError = new CustomError(
        "Experiencia no encontrada",
        400,
        "Experiencia no encontrada"
      );
      Experience.findById = jest.fn().mockResolvedValueOnce(undefined);

      await getExperience(
        req as Request,
        res as Response,
        next as NextFunction
      );
      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it receives a request without a experienceId in it's body", () => {
    test("Then next function should be called with a customError", async () => {
      req.params = { experience: "" };
      const expectedError = new CustomError(
        "Experiencia no encontrada",
        400,
        "Experiencia no encontrada"
      );
      Experience.findById = jest
        .fn()
        .mockRejectedValueOnce(new Error("Experiencia no encontrada"));

      await getExperience(
        req as Request,
        res as Response,
        next as NextFunction
      );
      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
