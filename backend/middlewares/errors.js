//import errorHandler here
const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  // utils folder a e errorHandler.js file ase, okhaneo statusCode use kora hoyeche

  //if this statusCode doesnt exist , then 500 will be appeared which means internal server error
  err.statusCode = err.statusCode || 500;

  // when we are in development mode, we will get the error message and stack trace
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  // when we are in production mode, we will get the error message and stack trace
  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    //wrong Mongoose Object ID Error
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    // Handling Mongoose Validation Error
    //postman a giye create new product a jeye jodi name ar id ta muche dei ba na rakhi ,then send korle { success:false, message: "Product validation failed: name: Product name is required" } dekhabe

    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    // Handling the mongoose duplicate key error
    // same name, email,  kono attribute er value onno user er same kore rakha jabe na.. match hole error dekhabe

    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }

    // Handling wrong JWT error

    if (err.name === "JsonWebTokenError") {
      const message = "JSON Web Token is invalid. Try Again!!!";
      error = new ErrorHandler(message, 400);
    }

    // Handling Expired JWT error
    if (err.name === "TokenExpiredError") {
      const message = "JSON Web Token is expired. Try Again!!!";
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      //since we have error, success will be false
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
