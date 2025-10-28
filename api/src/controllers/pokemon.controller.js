import { StatusCodes } from "http-status-codes";
// Utils
import { getPokemonModal } from "../utils/pokemon.util.js";
import { HttpError } from "../utils/httpError.util.js";
// Models
import { Pokemon } from "../models/associations.js";

export async function getAll(req, res) {
  const pokemons = await Pokemon.findAll();
  return res.success(pokemons);
}

export async function getModal(req, res, next) {
  const { id } = req.params;

  // Get the team modal
  const pokemon = await getPokemonModal(id);

  if (!pokemon) {
    return next(new HttpError("pokemon not found", StatusCodes.NOT_FOUND));
  }

  return res.success(pokemon);
}
