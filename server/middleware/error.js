import statusCode from "../config/statusCode.js";

const errMiddleware = (err, req, res, next) => {
  // default server error
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // error jwt must be provided
  if (err.message === "jwt must be provided") {
    err.message = "user is not logged in";
    err.statusCode = statusCode.UNAUTHORIZED;
  }

  if (err.message.startsWith("Cast to ObjectId failed for value")) {
    err.message = "Id length is invalid";
    err.statusCode = statusCode.BADREQUEST;
  }
  console.log(err);
  // send err response via API
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errMiddleware;
