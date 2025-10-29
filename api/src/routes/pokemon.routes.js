import { Router } from "express";
// Controller
import {
  getAll,
  getModal,
  getComparedPokemon,
  addVote,
  getVotes,
  getPodium,
  removeVote,
} from "../controllers/pokemon.controller.js";
// Schema
import { validate } from "../middlewares/validation.middleware.js";
import { pkSchema, comparePokemonsPkSchema } from "../schemas/pk.schema.js";
// Authentication
import { checkAuth } from "../middlewares/auth.middleware.js";

// Creating express router
export const pokemonRouter = Router();

// Route /pokemons => List of pokemons
pokemonRouter.get("/", getAll);

// Route /pokemons/votes => Podium of pokemons
pokemonRouter.get("/votes", getPodium);

// Route /pokemons/:pokemonId or pokemons/:pokemonName => Modal of a pokemon
pokemonRouter.get("/:pokemonToFind", getModal);

// Route /pokemons/:id/votes
pokemonRouter
  .route("/:pokemonId/votes")
  .all(validate("params", pkSchema))
  // => Vote for a pokemon
  .put(checkAuth, addVote)
  // => Unvote for a pokemon
  .delete(checkAuth, removeVote)
  // => Amount of votes for a pokemon
  .get(getVotes);

// Compare 2 pokemons
pokemonRouter.get(
  "/compare/:pokemonId/:idToCompare",
  validate("params", comparePokemonsPkSchema),
  getComparedPokemon
);
