import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { HttpError } from "../utils/httpError.util.js";
import { User } from "../models/user.model.js";
import { Team } from "../models/team.model.js";

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

export async function checkUserTeam(req, res, next) {
  const currentUser = await User.findByPk(req.userId);
  const team = await Team.findByPk(req.params.teamId);

  // Check if user own this team
  if (!(await currentUser.hasTeam(team))) {
    return next(
      new HttpError(
        `${currentUser.username} does not own ${team.name}`,
        StatusCodes.FORBIDDEN
      )
    );
  }

  next();
}
