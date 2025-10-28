import { Router } from "express";
// Controller
import {
  getAll,
  getModal,
  getComparedPokemon,
} from "../controllers/pokemon.controller.js";
// Schema
import { validate } from "../middlewares/validation.middleware.js";
import { comparePkSchema } from "../schemas/pokemon.schema.js";

// Creating express router
export const pokemonRouter = Router();

// Route /pokemons
pokemonRouter.get("/", getAll);

// Route /pokemons/:id or pokemons/:name
pokemonRouter.get("/:pokemonToFind", getModal);

// Features
pokemonRouter.get(
  "/:id/:idToCompare",
  validate("params", comparePkSchema),
  getComparedPokemon
);
