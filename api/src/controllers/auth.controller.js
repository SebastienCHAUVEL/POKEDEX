import { User } from "../models/associations.js";
import { StatusCodes } from "http-status-codes";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { HttpError } from "../utils/httpError.util.js";

export async function register(req, res, next) {
  const { username, password, validation } = req.body;

  // Check validation
  if (password !== validation) {
    return next(
      new HttpError(
        "Password and validation must match",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  // Hash password before saving in db
  const hashedPassword = await argon2.hash(password);

  const createdUser = await User.create({
    username,
    password: hashedPassword,
  });

  return res.created({ id: createdUser.id, username: createdUser.username });
}

export async function login(req, res, next) {
  const { username, password } = req.body;

  // Get user by username
  const user = await User.findOne({ where: { username } });

  // Check user
  if (!user) {
    return next(
      new HttpError(
        "Login and Password does not match",
        StatusCodes.UNAUTHORIZED
      )
    );
  }

  // Check if hashed passwords match
  const passwordIsValid = await argon2.verify(user.password, password);
  if (!passwordIsValid) {
    return next(
      new HttpError(
        "Login and Password does not match",
        StatusCodes.UNAUTHORIZED
      )
    );
  }

  // Create jwt
  const token = jwt.sign(
    { user_id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "4h" } // options cf https://www.npmjs.com/package/jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
  );

  res.success(token);
}
