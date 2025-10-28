import { Team } from "../models/associations.js";

export async function getTeamModal(id) {
  const team = await Team.findByPk(id, {
    include: {
      association: "pokemons",
      include: {
        association: "types",
        // hide association relation(PokemonTypes)
        through: { attributes: [] },
      },
      through: { attributes: [] },
    },
  });
  if (!team) {
    return null;
  }
  // Trick to convert team into a classic JS object to add number of pokemon in modal
  const teamObject = JSON.parse(JSON.stringify(team));
  teamObject.pokemonCount = team.pokemons.length;

  return teamObject;
}
