module.exports = (err, req, res, next) => {
  err.status = err.status || "fail";
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "development")
    sendErrorDevelopemnt(err, req, res);
};

const sendErrorDevelopemnt = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};
