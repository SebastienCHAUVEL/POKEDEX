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
  const { teamId } = req.params;

  // Get the team modal
  const team = await getTeamModal(teamId);

  if (!team) {
    return next(new HttpError("team not found", StatusCodes.NOT_FOUND));
  }

  return res.success(team);
}

export async function removeTeam(req, res, next) {
  const { teamId } = req.params;

  const deletedCount = await Team.destroy({ where: { id: teamId } });
  if (deletedCount === 0) {
    return next(new HttpError("team not found", StatusCodes.NOT_FOUND));
  }

  return res.deleted();
}

export async function createTeam(req, res) {
  const { name, description } = req.body;
  const newTeam = await Team.create({ name, description, userId: req.userId });

  res.created(newTeam);
}

export async function updateName(req, res, next) {
  const { teamId } = req.params;
  const [updatedCount, updatedTeam] = await Team.update(req.body, {
    where: { id: teamId },
    returning: true, // allow Team.update to return updatedTeam
  });

  if (updatedCount === 0) {
    return next(new HttpError("team not found", StatusCodes.NOT_FOUND));
  }

  const updatedItem = updatedTeam[0];

  res.success(updatedItem);
}

export async function addPokemonInTeam(req, res, next) {
  const { teamId, pokemonId } = req.params;

  const team = await Team.findByPk(teamId);
  const pokemon = await Pokemon.findByPk(pokemonId);

  if (!team || !pokemon) {
    return next(
      new HttpError(
        `${team ? "Pokemon" : "Team"} Not found`,
        StatusCodes.NOT_FOUND
      )
    );
  }

  if ((await team.countPokemons()) >= 6) {
    return next(
      new HttpError(
        `${team.name} cannot exceed 6 pokemons`,
        StatusCodes.BAD_REQUEST
      )
    );
  }

  // Add pokemon in team(duplicates pokemons in a team not allowed by default)
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

  return res.deleted();
}
