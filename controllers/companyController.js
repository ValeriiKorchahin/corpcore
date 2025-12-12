import { companySchema } from '../validators/companyValidator.js';
import { BadRequestError } from '../utils/errors/BadRequestError.js';
import { getCompanyList, create } from '../services/companyService.js';

export const getCompanies = async(req, res, next) => {
    try {
        const companies = await getCompanyList({
            organizationId: req?.user?.organizationId,
            search: req.query.search || '',
            limit: req.body.limit,
            page: req.body.page,
        });
        return res.status(200).json(companies);
    } catch(err) {
        next(err);
    }
};

export const createCompany = async(req, res, next) => {
    try {
        const organizationId = req?.user?.organizationId;
        const { error, value } = companySchema.validate(req.body);
        if (error) {
            throw new BadRequestError(error.details[0].message);
        }
        const company = await create(value, organizationId);
        return res.status(200).send({ company });
    } catch(err) {
        next(err);
    }
};
