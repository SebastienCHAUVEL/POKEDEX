import Joi from "joi";

export const comparePkSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
  idToCompare: Joi.number().integer().min(1).required(),
});
