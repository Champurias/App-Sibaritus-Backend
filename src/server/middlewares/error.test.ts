import CustomError from "../CustomError/CustomError";
import { generalError, unknownEndpoint } from "./error";
import type { Response } from "express";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given a endpointUnknown middlewear", () => {
  describe("When its receives a response", () => {
    test("Then it should call it with method status with 404", () => {
      const statusCode = 404;

      unknownEndpoint(null, res as Response);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });

    test("Then it should call its method json with a 'Error not found the endpoint, message", () => {
      const errorResponse = {
        message: "Endpoint not found",
      };

      unknownEndpoint(null, res as Response);

      expect(res.json).toHaveBeenCalledWith(errorResponse);
    });
  });
});

describe("Given a generalError error", () => {
  describe("When its receives a response with a customError message", () => {
    const error = new CustomError("");
    test("Then it should call its method status with 500", () => {
      const status = 500;

      generalError(error, null, res as Response, () => {});

      expect(res.status).toHaveBeenCalledWith(status);
    });

    test("Then it should call its method json with a error 'General Error' error", () => {
      const errormessage = {
        error: "General error",
      };

      generalError(error, null, res as Response, () => {});

      expect(res.json).toHaveBeenCalledWith(errormessage);
    });
  });
});
