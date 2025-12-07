import { sequelize } from '../database/database.js';
import UserModel from './userModel.js';
import CompanyModel from './companyModel.js';
import OrganizationModel from './organizationModel.js';
import UserOrganizations from './userOrganizationsModel.js';

UserModel.belongsToMany(OrganizationModel, {
    through: UserOrganizations,
    foreignKey: 'userId',
    as: 'organizations',
});
OrganizationModel.belongsToMany(UserModel, {
    through: UserOrganizations,
    foreignKey: 'organizationId',
    as: 'members',
});

OrganizationModel.hasMany(CompanyModel, {
    foreignKey: 'organizationId',
    as: 'companies',
    onDelete: 'CASCADE',
});
CompanyModel.belongsTo(OrganizationModel, {
    foreignKey: 'organizationId',
    as: 'organization',
});

UserModel.belongsToMany(CompanyModel, {
    through: 'UserCompanies',
    foreignKey: 'userId',
    otherKey: 'companyId',
});
CompanyModel.belongsToMany(UserModel, {
    through: 'UserCompanies',
    foreignKey: 'companyId',
    otherKey: 'userId',
});

export {
    sequelize,
    UserModel,
    CompanyModel,
    OrganizationModel,
};


