import { Router } from "express";
// Controller
import { getAll, getModal } from "../controllers/pokemon.controller.js";
// Schemas
import { validate } from "../middlewares/validation.middleware.js";
import { pkSchema } from "../schemas/pk.schema.js";

// Creating express router
export const pokemonRouter = Router();

// Route /pokemon
pokemonRouter.get("/", getAll);

// Route /pokemon/:id
pokemonRouter.get("/:id", validate("params", pkSchema), getModal);
