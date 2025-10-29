import Joi from "joi";

export const pkSchema = Joi.object({
  teamId: Joi.number().integer().min(1),
  pokemonId: Joi.number().integer().min(1),
  typeId: Joi.number().integer().min(1),
})
  .min(1)
  .required();

export const pokemonTeamPkSchema = Joi.object({
  teamId: Joi.number().integer().min(1).required(),
  pokemonId: Joi.number().integer().min(1).required(),
});

export const comparePokemonsPkSchema = Joi.object({
  pokemonId: Joi.number().integer().min(1).required(),
  idToCompare: Joi.number().integer().min(1).required(),
});
