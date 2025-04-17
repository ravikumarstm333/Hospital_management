class ErrorHandler extends Error {
  constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
  }
}

// Middleware for handling errors
const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Handle Mongoose errors
  if (err.name === "CastError") {
      err = new ErrorHandler(404, `Resource not found. Invalid: ${err.path}`);
  }
  if (err.code === 11000) {
      err = new ErrorHandler(400, `Duplicate ${Object.keys(err.keyValue)} entered`);
  }
  if (err.name === "ValidationError") {
      err = new ErrorHandler(400, Object.values(err.errors).map((val) => val.message).join(", "));
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
      err = new ErrorHandler(400, "Invalid Token. Please login again");
  }
  if (err.name === "TokenExpiredError") {
      err = new ErrorHandler(400, "Token has expired. Please login again");
  }

  return res.status(err.statusCode).json({
      success: false,
      message: err.message,
  });
};

export { ErrorHandler, errorMiddleware };
export default errorMiddleware;
