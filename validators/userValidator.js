import Joi from 'joi';

export const userSchema = Joi.object({
    name: Joi.string().min(2).max(50).trim().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(6).required(),
    role: Joi.number().integer().required(),
});
