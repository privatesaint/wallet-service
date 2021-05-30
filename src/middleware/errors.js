const joiErrors = (error) =>
  error.details.map((detail) => detail.message).join(",");

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  // Handling Joi Validation Error
  if (err.details) {
    const errors = joiErrors(err);
    return res.status(400).json({
      success: false,
      message: errors,
    });
  }

  // Handling Expired JWT token error
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired",
    });
  }

  // Handle mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;

    return res.status(400).json({
      success: false,
      message,
    });
  }

  let error = { ...err };
  error.message = err.message;
  res.status(error.statusCode).json({
    success: false,
    message: error.message || "Internal Server Error.",
  });
};
