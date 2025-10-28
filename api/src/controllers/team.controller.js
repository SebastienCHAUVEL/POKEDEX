import { Team } from "../models/associations.js";
import { HttpError } from "../utils/httpError.util.js";

import { StatusCodes } from "http-status-codes";

export async function getAll(req, res) {
  const teams = await Team.findAll();
  return res.success(teams);
}

export async function getModal(req, res, next) {
  const { id } = req.params;

  // Get the team
  const team = await Team.findByPk(id, {
    attributes: ["name", "description", "createdAt", "updatedAt"],
    include: {
      association: "pokemons",
      attributes: ["id", "name"],
      include: {
        association: "types",
        attributes: ["id", "name", "color"],
        through: { attributes: [] },
      },
      through: { attributes: [] },
    },
  });

  if (!team) {
    return next(new HttpError("team not found", StatusCodes.NOT_FOUND));
  }

  // Trick to convert team into a classic JS object to add number of pokemon
  const teamObject = JSON.parse(JSON.stringify(team));

  teamObject.pokemonCount = team.pokemons.length;

  return res.success(teamObject);
}
