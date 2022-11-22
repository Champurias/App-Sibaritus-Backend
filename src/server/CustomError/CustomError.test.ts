import CustomError from "./CustomError";

describe("Given the class CustomError", () => {
  describe("When it is instantiated with message 'Fail connection' statusCode 409 and public message 'Error to connection'", () => {
    test("Then it should return an instace of error with the received prperties", () => {
      const expectedError = {
        message: "fail connection",
        statusCode: 409,
        publicMessage: "Error to connection",
      };

      const newCustomError = new CustomError(
        expectedError.message,
        expectedError.statusCode,
        expectedError.publicMessage
      );
      expect(newCustomError).toHaveProperty("message", expectedError.message);
      expect(newCustomError).toHaveProperty(
        "customMessage",
        expectedError.publicMessage
      );
      expect(newCustomError).toHaveProperty("state", expectedError.statusCode);

      expect(newCustomError).toBeInstanceOf(Error);
    });
  });
});
