import { Router } from "express";
// Controller
import { getAll, getModal } from "../controllers/team.controller.js";
// Schemas
import { validate } from "../middlewares/validation.middleware.js";
import { pkSchema } from "../schemas/pk.schema.js";

// Creating express router
export const teamRouter = Router();

teamRouter.get("/", getAll);

teamRouter.get("/:id", validate("params", pkSchema), getModal);
