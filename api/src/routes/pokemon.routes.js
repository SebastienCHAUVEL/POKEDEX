import { Router } from "express";
// Controller
import {
  getAll,
  getModal,
  getComparedPokemon,
  addVote,
  getVotes,
  getPodium,
} from "../controllers/pokemon.controller.js";
// Schema
import { validate } from "../middlewares/validation.middleware.js";
import { pkSchema } from "../schemas/pk.schema.js";
import { comparePkSchema } from "../schemas/pokemon.schema.js";
// Authentication
import { checkAuth } from "../middlewares/auth.middleware.js";

// Creating express router
export const pokemonRouter = Router();

// Route /pokemons => List of pokemons
pokemonRouter.get("/", getAll);

// Route /pokemons/votes => Podium of pokemons
pokemonRouter.get("/votes", getPodium);

// Route /pokemons/:id or pokemons/:name => Modal of a pokemon
pokemonRouter.get("/:pokemonToFind", getModal);

// Route /pokemons/:id/votes
pokemonRouter
  .route("/:id/votes")
  .all(validate("params", pkSchema))
  // => Vote for a pokemon
  .put(checkAuth, addVote)
  // => Amount of votes for a pokemon
  .get(getVotes);

// Compare 2 pokemons
pokemonRouter.get(
  "/compare/:id/:idToCompare",
  validate("params", comparePkSchema),
  getComparedPokemon
);
