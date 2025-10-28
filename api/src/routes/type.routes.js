import { Router } from "express";
// Controller
import { getAll, getPokemonsByType } from "../controllers/type.controller.js";
// Schemas
import { validate } from "../middlewares/validation.middleware.js";
import { pkSchema } from "../schemas/pk.schema.js";

// Creating express router
export const typeRouter = Router();

// Route /types
typeRouter.get("/", getAll);

// Route /types/:id
typeRouter.get("/:id", validate("params", pkSchema), getPokemonsByType);
