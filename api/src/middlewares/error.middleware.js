import { StatusCodes } from "http-status-codes";

export const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  // Sequelize unique contrain error(if multiple fields are involved)
  if (err.name === "SequelizeUniqueConstraintError") {
    // Get the field names that caused the unique constraint error
    const fieldNames = Object.keys(err.fields);
    // Copying the original error messages
    let message = `${err.parent.constraint.split("_")[1]} must be unique`;
    // If multiple fields are involved, create a combined error message
    if (fieldNames.length > 1) {
      message = `The combination of the following fields must be unique: ${fieldNames.join(
        ", "
      )}`;
    }

    return res.status(StatusCodes.CONFLICT).json({ errors: [message] });
  }

  // Schema errors
  if (err.isJoi) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errors: err.details.map((e) => e.message) });
  }

  // errors thrown from controller(ex: 404)
  if (err.name === "HttpError") {
    return res.status(err.status).json({ errors: [err.message] });
  }

  // JWT errors
  if (
    err.name === "TokenExpiredError" ||
    err.name === "JsonWebTokenError" ||
    err.name === "NotBeforeError"
  ) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ errors: [err.message] });
  }

  // Other errors(=> 500)
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ errors: ["Internal Server Error"] });
};
