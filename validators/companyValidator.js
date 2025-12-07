import Joi from 'joi';

export const companySchema = Joi.object().keys({
    name: Joi.string().required(),
    logoUrl: Joi.string(),
    country: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.string().required().min(5),
});
