import { Team } from "../models/associations.js";

export async function getTeamModal(id) {
  const team = await Team.findByPk(id, {
    attributes: ["id", "name", "description", "createdAt", "updatedAt"],
    include: {
      association: "pokemons",
      attributes: ["id", "name"],
      include: {
        association: "types",
        attributes: ["id", "name", "color"],
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
