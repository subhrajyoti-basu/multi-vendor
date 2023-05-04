import ErrorHandler from "./errorHandler.js";

const asyncErr = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    next(new ErrorHandler(error.message, error.statusCode));
  }
};

export default asyncErr;
