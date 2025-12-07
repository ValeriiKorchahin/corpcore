import { companySchema } from '../validators/companyValidator.js';
import { BadRequestError } from '../utils/errors/BadRequestError.js';

export const createCompany = async(req, res, next) => {
    try {
        const { error, value } = companySchema.validate(req.body);
        if (error) {
            throw new BadRequestError(error.details[0].message);
        }
        const company = await createCompany(value);
        return res.status(200).send({ company });
    } catch(err) {
        next(err);
    }
};
