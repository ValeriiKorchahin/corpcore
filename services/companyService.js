import { sequelize } from '../database/database.js';
import { CompanyModel, UserCompanyModel } from '../models/index.js';
import { Op } from 'sequelize';
import { CompanyRoles } from '../utils/enums/company-roles.js';
import { NotFoundError } from '../utils/errors/NotFoundError.js';

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

export const fetchUserCompanies = async(user) => {
    const { organizationId , userId } = user;
    const companies = await UserCompanyModel.findAll({
        where: {
            userId: userId,
        },
        include: [
            {
                model: CompanyModel,
                attributes: [
                    ['id', 'id'],
                    ['name', 'name'],
                ],
                where: { organizationId: organizationId },
            },
        ],
        attributes: ['role'],
    });

    const flatCompanies = companies.map(c => ({
        id: c.company.id,
        name: c.company.name,
        role: c.role,
    }));

    return flatCompanies;
};

export const getCompanyById = async(companyId) => {
    if (!companyId) {
        throw new NotFoundError('Company not found');
    }
    const company = await CompanyModel.findByPk(companyId);

    return company;
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
        await UserCompanyModel.create({
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

export const update = async(value, companyId) => {
    try {
        const company = await CompanyModel.findByPk(companyId);
        if (!company) {
            throw new NotFoundError('Company not found');
        }
        await company.update(value);
        return company;
    } catch (err) {
        throw err;
    }
};

export const remove = async(companyId) => {
    try {
        const company = await CompanyModel.findByPk(companyId);
        if (!company) {
            throw new NotFoundError('Company not found');
        }
        await company.destroy();
        return company;
    } catch (err) {
        throw err;
    }
};


