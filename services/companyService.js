import { sequelize } from '../database/database.js';
import { CompanyModel } from '../models/index.js';
import { Op } from 'sequelize';
import { ConflictError } from '../utils/errors/ConflictError.js';

export const getAllCompanies = async(payload) => {
    debugger;
    const { organizationId, search, limit, page } = payload;

    const offset = (page - 1) * limit;

    const where = {
        organizationId: organizationId,
        ...(search && {
            name: { [Op.like]: `%${search}%` },
        }),
    };

    const { rows: companies, count: total } = await CompanyModel.findAndCountAll({
        where,
        limit,
        offset,
        order: [['createdAt', 'DESC']], 
    });
    return {
        data: companies,
        total,
        page,
        limit,
    };
};

// export const createCompany = async(value) => {
//     const transaction = await sequelize.transaction();
//     const { email, name } = value;
//
//     try {
//         const existingCompany = await CompanyModel.findOne({
//             where: {
//                 [Op.or]: {
//                     email,
//                     name,
//                 },
//             },
//             transaction,
//         });
//         if (existingCompany) {
//             throw new ConflictError('Company already exists.');
//         }
//     } catch(err) {
//
//     }
// }
