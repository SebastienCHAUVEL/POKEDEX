import Joi from "joi";

export const createSchema = Joi.object({
  name: Joi.string().max(255).required(),
  description: Joi.string(),
}).required();

export const updateNameSchema = Joi.object({
  name: Joi.string().max(255).required(),
}).required();
