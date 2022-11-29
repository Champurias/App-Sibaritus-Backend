import type { NextFunction, Response } from "express";
import Experience from "../../../database/models/users/Experience";
import CustomError from "../../CustomError/CustomError";
import { getExperiencies } from "./experienceController";

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
});
