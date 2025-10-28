import { Router } from "express";
// Controller
import {
  getAll,
  getModal,
  removeTeam,
  createTeam,
  updateName,
  addPokemonInTeam,
  removePokemonInTeam,
} from "../controllers/team.controller.js";
// Schemas
import { validate } from "../middlewares/validation.middleware.js";
import { pkSchema, pokemonTeamPk } from "../schemas/pk.schema.js";
import { createSchema, updateNameSchema } from "../schemas/team.schema.js";

// Creating express router
export const teamRouter = Router();

// Route /team
teamRouter
  .route("/")
  .get(getAll)
  .post(validate("body", createSchema), createTeam);

// Route /team/:id
teamRouter
  .route("/:id")
  .all(validate("params", pkSchema))
  .get(getModal)
  .delete(removeTeam)
  .patch(validate("body", updateNameSchema), updateName);

// Route /team/:teamId/pokemon/:pokemonId
teamRouter
  .route("/:teamId/pokemon/:pokemonId")
  .all(validate("params", pokemonTeamPk))
  .post(addPokemonInTeam)
  .delete(removePokemonInTeam);
