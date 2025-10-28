import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
// Utils
import { HttpError } from "../utils/httpError.util.js";
// Models
import { Pokemon } from "../models/associations.js";

export async function getAll(req, res) {
  const pokemons = await Pokemon.findAll();

  return res.success(pokemons);
}

export async function getModal(req, res, next) {
  const { pokemonToFind } = req.params;

  // Try to get id
  const id = parseInt(pokemonToFind);

  // Change the where clause depend on params(id or name)
  let where = {};
  if (Number.isNaN(id)) {
    where.name = {
      [Op.iLike]: `%${pokemonToFind}%`, // Make case insensitive + flexible search
    };
  } else {
    where.id = id;
  }

  // Get the pokemon modal
  const pokemon = await Pokemon.findOne({
    where,
    include: {
      association: "types",
      // hide association relation(PokemonTypes)
      through: { attributes: [] },
    },
  });

  if (!pokemon) {
    return next(new HttpError("pokemon not found", StatusCodes.NOT_FOUND));
  }

  return res.success(pokemon);
}

export async function getComparedPokemon(req, res, next) {
  const { id, idToCompare } = req.params;

  if (id === idToCompare) {
    return next(
      new HttpError("Cannot compare the same pokemon", StatusCodes.BAD_REQUEST)
    );
  }

  // Get both of the pokemons
  const pokemons = await Pokemon.findAll({
    where: {
      [Op.or]: [{ id }, { id: idToCompare }],
    },
    include: {
      association: "types",
      // hide association relation(PokemonTypes)
      through: { attributes: [] },
    },
  });

  // In case we don't get both of the pokemons
  if (pokemons.length !== 2) {
    return next(new HttpError("pokemons not found", StatusCodes.NOT_FOUND));
  }

  return res.success(pokemons);
}
