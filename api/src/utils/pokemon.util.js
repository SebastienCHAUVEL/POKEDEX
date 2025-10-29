import { Pokemon } from "../models/pokemon.model.js";

export async function getPokemonVote(pokemonId) {
  const pokemon = await Pokemon.findByPk(pokemonId, {
    attributes: ["id", "name", "createdAt", "updatedAt"],
    include: {
      association: "votes",
      attributes: ["id", "username"],
      through: { attributes: ["createdAt"] },
    },
  });

  if (!pokemon) {
    return null;
  }

  // Trick to convert pokemon into a classic JS object to add total votes
  const pokemonObject = JSON.parse(JSON.stringify(pokemon));
  pokemonObject.totalVotes = pokemon.votes.length;

  return pokemonObject;
}
