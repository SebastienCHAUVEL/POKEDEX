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
// Authentification
import { checkAuth } from "../middlewares/auth.middleware.js";

// Creating express router
export const teamRouter = Router();

// Route /teams
teamRouter
  .route("/")
  .get(getAll)
  .post(checkAuth, validate("body", createSchema), createTeam);

// Route /teams/:id
teamRouter
  .route("/:id")
  .all(validate("params", pkSchema))
  .get(getModal)
  .delete(checkAuth, removeTeam)
  .patch(checkAuth, validate("body", updateNameSchema), updateName);

// Route /teams/:teamId/pokemons/:pokemonId
teamRouter
  .route("/:teamId/pokemons/:pokemonId")
  .all(validate("params", pokemonTeamPk))
  .post(checkAuth, addPokemonInTeam)
  .delete(checkAuth, removePokemonInTeam);
