import { StatusCodes } from "http-status-codes";
// Utils
import { HttpError } from "../utils/httpError.util.js";
// Models
import { Type } from "../models/associations.js";

export async function getAll(req, res) {
  const pokemons = await Type.findAll({
    attributes: ["id", "name", "color"],
  });

  return res.success(pokemons);
}

export async function getPokemonsByType(req, res, next) {
  const { typeId } = req.params;
  const type = await Type.findByPk(typeId, {
    attributes: ["id", "name", "color"],
    include: {
      association: "pokemons",
      attributes: ["id", "name"],
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
