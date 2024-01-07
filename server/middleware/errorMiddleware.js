const errorHandler = (err, req, res, next) => {
  // Extracting the HTTP status code or defaulting to 500
  const statusCode = res.statusCode ? res.statusCode : 500;

  // Extracting the error message until the first '{' character (if any)
  let error = "";
  for (const ch of err.message) {
    if (ch === "{") break;
    error += ch;
  }

  // Sending the error response with relevant information
  res.status(statusCode).json({
    success: false,
    error: error,
    stack:
      process.env.NODE_ENV === "production" || !err.stack ? null : err.stack,
  });

  // Logging the error details for debugging
  console.log(`Error Handler: Status ${statusCode}, Message: ${error}`);

  // Continue with the next middleware in the stack
  next();
};

module.exports = {
  errorHandler,
};
