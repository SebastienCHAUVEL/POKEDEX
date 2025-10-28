import Joi from "joi";

export const pkSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});

export const pokemonTeamPk = Joi.object({
  teamId: Joi.number().integer().min(1).required(),
  pokemonId: Joi.number().integer().min(1).required(),
});
