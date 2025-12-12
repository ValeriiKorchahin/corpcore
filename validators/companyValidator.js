import Joi from 'joi';

export const companySchema = Joi.object().keys({
    name: Joi.string().min(2).required(),
    logoUrl: Joi.string().allow(null, '').optional(),
    country: Joi.string().min(2).required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.string().required().min(5),
});
