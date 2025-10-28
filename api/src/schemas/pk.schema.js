import Joi from "joi";
export const pkSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});
