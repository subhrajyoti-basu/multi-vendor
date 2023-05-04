// custom error handler
class ErrorHandler extends Error {
  constructor(message, statusCode = 500) {
    // overright the default error class
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorHandler;
