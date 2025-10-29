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
import { pkSchema, pokemonTeamPkSchema } from "../schemas/pk.schema.js";
import { createSchema, updateNameSchema } from "../schemas/team.schema.js";
// Authentication
import { checkAuth, checkUserTeam } from "../middlewares/auth.middleware.js";

// Creating express router
export const teamRouter = Router();

// Route /teams
teamRouter
  .route("/")
  // => List of teams
  .get(getAll)
  // => Create a new team
  .post(checkAuth, validate("body", createSchema), createTeam);

// Route /teams/:id
teamRouter
  .route("/:teamId")
  .all(validate("params", pkSchema))
  // ==> Modal of a team
  .get(getModal)
  // ==> Remove a team
  .delete(checkAuth, checkUserTeam, removeTeam)
  // => Update the name of a team
  .patch(
    checkAuth,
    checkUserTeam,
    validate("body", updateNameSchema),
    updateName
  );

// Route /teams/:teamId/pokemons/:pokemonId
teamRouter
  .route("/:teamId/pokemons/:pokemonId")
  .all(validate("params", pokemonTeamPkSchema))
  // => Add a Pokemon in a team (diplicate pokemons not allowed)
  .put(checkAuth, checkUserTeam, addPokemonInTeam)
  // => Remove a pokemon from a team
  .delete(checkAuth, checkUserTeam, removePokemonInTeam);
