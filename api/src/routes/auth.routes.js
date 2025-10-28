import { Router } from "express";
// Controller
import { register, login } from "../controllers/auth.controller.js";
// Schemas
import { validate } from "../middlewares/validation.middleware.js";
import { registerUserSchema, loginUserSchema } from "../schemas/user.schema.js";

export const authRouter = Router();

authRouter.post("/register", validate("body", registerUserSchema), register);
authRouter.post("/login", validate("body", loginUserSchema), login);
