import { StatusCodes } from "http-status-codes";
// Utils
import { getTeamModal } from "../utils/team.util.js";
import { HttpError } from "../utils/httpError.util.js";
// Models
import { Pokemon, Team } from "../models/associations.js";

export async function getAll(req, res) {
  const teams = await Team.findAll();
  return res.success(teams);
}

export async function getModal(req, res, next) {
  const { id } = req.params;

  // Get the team modal
  const team = await getTeamModal(id);

  if (!team) {
    return next(new HttpError("team not found", StatusCodes.NOT_FOUND));
  }

  return res.success(team);
}

export async function removeTeam(req, res, next) {
  const { id } = req.params;

  const deletedCount = await Team.destroy({ where: { id } });
  if (deletedCount === 0) {
    return next(new HttpError("team not found", StatusCodes.NOT_FOUND));
  }

  return res.deleted();
}

export async function createTeam(req, res) {
  const newTeam = await Team.create(req.body);

  res.created(newTeam);
}

export async function updateName(req, res, next) {
  const { id } = req.params;

  const team = await Team.findByPk(id);

  if (!team) {
    return next(new HttpError("team not found", StatusCodes.NOT_FOUND));
  }
  const updatedTeam = await team.update(req.body);

  res.success(updatedTeam);
}

export async function addPokemonInTeam(req, res, next) {
  const { teamId, pokemonId } = req.params;

  const team = await Team.findByPk(teamId);
  const pokemon = await Pokemon.findByPk(pokemonId);

  if (!team || !pokemon) {
    next(
      new HttpError(
        `${team ? "Pokemon" : "Team"} Not found`,
        StatusCodes.NOT_FOUND
      )
    );
    return;
  }

  // Add pokemon in team(duplicates pokemons in a team not allowed)
  await team.addPokemon(pokemon);

  // Get the new team modal
  const newTeam = await getTeamModal(teamId);

  return res.success(newTeam);
}

export async function removePokemonInTeam(req, res, next) {
  const { teamId, pokemonId } = req.params;

  const team = await Team.findByPk(teamId);
  const pokemon = await Pokemon.findByPk(pokemonId);

  if (!team || !pokemon) {
    next(
      new HttpError(
        `${team ? "Pokemon" : "Team"} Not found`,
        StatusCodes.NOT_FOUND
      )
    );
    return;
  }

  // In case pokemon is not in this team
  if (!(await team.hasPokemon(pokemon))) {
    next(
      new HttpError(
        `${pokemon.name} not found in ${team.name}`,
        StatusCodes.BAD_REQUEST
      )
    );
    return;
  }

  await team.removePokemon(pokemon);

  // Get the new team modal
  const newTeam = await getTeamModal(teamId);

  return res.success(newTeam);
}
