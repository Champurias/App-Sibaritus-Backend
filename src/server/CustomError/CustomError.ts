class CustomError extends Error {
  constructor(
    message: string,
    public state: number,
    public customMessage: string
  ) {
    super(message);
  }
}

export default CustomError;
