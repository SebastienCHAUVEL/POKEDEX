import { StatusCodes } from "http-status-codes";
// Utils
import { HttpError } from "../utils/httpError.util.js";
// Models
import { Type } from "../models/associations.js";

export async function getAll(req, res) {
  const pokemons = await Type.findAll();

  return res.success(pokemons);
}

export async function getPokemonsByType(req, res, next) {
  const { id } = req.params;
  const type = await Type.findByPk(id, {
    include: {
      association: "pokemons",
      // hide association relation(PokemonTypes)
      through: { attributes: [] },
    },
  });
  console.log(type);

  if (!type) {
    return next(new HttpError("type not found", StatusCodes.NOT_FOUND));
  }

  return res.success(type);
}
