import { sequelize } from '../database/database.js';
import UserModel from './userModel.js';
import CompanyModel from './companyModel.js';
import OrganizationModel from './organizationModel.js';
import UserOrganizationsModel from './userOrganizationsModel.js';
import UserCompanyModel from './userCompaniesModel.js';

// Organization <-> Users (WITH ROLES)
UserModel.belongsToMany(OrganizationModel, {
    through: UserOrganizationsModel,
    foreignKey: 'userId',
    as: 'organizations',
});
OrganizationModel.belongsToMany(UserModel, {
    through: UserOrganizationsModel,
    foreignKey: 'organizationId',
    as: 'users',
});

// Organization -> Companies
OrganizationModel.hasMany(CompanyModel, { foreignKey: 'organizationId' });
CompanyModel.belongsTo(OrganizationModel, { foreignKey: 'organizationId' });

UserCompanyModel.belongsTo(CompanyModel, { foreignKey: 'companyId' });
UserCompanyModel.belongsTo(UserModel, { foreignKey: 'userId' });

UserOrganizationsModel.belongsTo(OrganizationModel, { foreignKey: 'organizationId' });
UserOrganizationsModel.belongsTo(UserModel, { foreignKey: 'userId' });

// Company <-> Users (WITH ROLES)
UserModel.belongsToMany(CompanyModel, {
    through: UserCompanyModel,
    foreignKey: 'userId',
    otherKey: 'companyId',
    as: 'companies',
});
CompanyModel.belongsToMany(UserModel, {
    through: UserCompanyModel,
    foreignKey: 'companyId',
    otherKey: 'userId',
    as: 'users',
});

export {
    sequelize,
    UserModel,
    CompanyModel,
    OrganizationModel,
    UserOrganizationsModel,
    UserCompanyModel,
};


