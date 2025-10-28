import Joi from "joi";

export const registerUserSchema = Joi.object({
  username: Joi.string().min(1).required(),
  password: Joi.string()
    .min(8)
    .regex(/[0-9]/)
    .regex(/[a-z]/)
    .regex(/[A-Z]/)
    .required(),
  validation: Joi.string()
    .min(8)
    .regex(/[0-9]/)
    .regex(/[a-z]/)
    .regex(/[A-Z]/)
    .required(),
});

export const loginUserSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(), // Pas besoin de valider plus que ça, de toutes manières le mdp va être comparé à l'étape après
});
