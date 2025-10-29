import { Pokemon } from "./pokemon.model.js";
import { Team } from "./team.model.js";
import { Type } from "./type.model.js";
import { User } from "./user.model.js";

// Association between Team and Pokemon (Many-to-Many)
Team.belongsToMany(Pokemon, {
  as: "pokemons",
  foreignKey: "teamId",
  otherKey: "pokemonId",
  through: "TeamPokemons",
});
Pokemon.belongsToMany(Team, {
  as: "teams",
  foreignKey: "pokemonId",
  otherKey: "teamId",
  through: "TeamPokemons",
});

// Association between Pokemon and Type (Many-to-Many)
Pokemon.belongsToMany(Type, {
  as: "types",
  foreignKey: "pokemonId",
  otherKey: "typeId",
  through: "PokemonTypes",
});
Type.belongsToMany(Pokemon, {
  as: "pokemons",
  foreignKey: "typeId",
  otherKey: "pokemonId",
  through: "PokemonTypes",
});

// Association between User and Pokemon ==> vote (Many-to-many)
User.belongsToMany(Pokemon, {
  as: "votes",
  foreignKey: "userId",
  otherKey: "pokemonId",
  through: "VotePokemons",
});
Pokemon.belongsToMany(User, {
  as: "votes",
  foreignKey: "pokemonId",
  otherKey: "userId",
  through: "VotePokemons",
});

export { Pokemon, Team, Type, User };
