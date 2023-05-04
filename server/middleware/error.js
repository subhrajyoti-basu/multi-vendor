const errMiddleware = (err, req, res, next) => {
  // default server error
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";

  // send err response via API
  return res.status(statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default errMiddleware;
