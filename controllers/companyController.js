import { companySchema } from '../validators/companyValidator.js';
import { BadRequestError } from '../utils/errors/BadRequestError.js';
import { getAllCompanies } from '../services/companyService.js';

export const getCompanies = async(req, res, next) => {
    try {
        const companies = await getAllCompanies({
            organizationId: req.user.organizationId,
            search: req.query.search,
            limit: req.body.limit,
            page: req.query.page,
        });
        return res.status(200).json(companies);
    } catch(err) {
        next(err);
    }
};

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
