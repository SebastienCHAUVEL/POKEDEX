import { Pokemon } from "../models/associations.js";

export async function getPokemonModal(id) {
  return await Pokemon.findByPk(id, {
    attributes: ["id", "name"],
    include: {
      association: "types",
      attributes: ["id", "name", "color"],
      // hide association relation(PokemonTypes)
      through: { attributes: [] },
    },
  });
}
