import { sequelize } from '../database/database.js';
import { CompanyModel } from '../models/index.js';
import { Op } from 'sequelize';
import userCompaniesModel from '../models/userCompaniesModel.js';
import { CompanyRoles } from '../utils/enums/company-roles.js';

export const getCompanyList = async(payload) => {
    const { organizationId, search, limit, page } = payload;

    if (!page || !limit) {
        // no pagination → return all
        const { rows: companies, count: total } = await CompanyModel.findAndCountAll();
        return {
            data: companies,
            total: total,
            page: 1,
            limit: total,
            order: [['createdAt', 'DESC']],
        };
    }

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

export const create = async(value, user) => {
    const transaction = await sequelize.transaction();
    const { organizationId, userId } = user;
    try {
        const company = await CompanyModel.create({
            ...value,
            organizationId: organizationId,
        }, {
            transaction,
        });
        
        await userCompaniesModel.create({
            userId: userId,
            companyId: company.id,
            role: CompanyRoles.ADMIN, 
        }, {
            transaction,
        });

        await transaction.commit();

        return company;
    }catch (err) {
        await transaction.rollback();
        throw err;
    }
};

