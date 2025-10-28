import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { HttpError } from "../utils/httpError.util.js";

export function checkAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next(new HttpError("JSON token required", StatusCodes.UNAUTHORIZED));
  }

  // Getting the token inside header
  const token = authHeader.split(" ")[1];

  // Check token
  const tokenInfo = jwt.verify(token, process.env.JWT_SECRET);
  console.log(tokenInfo);

  // saving current user in req
  req.userId = tokenInfo.user_id;

  next();
}
