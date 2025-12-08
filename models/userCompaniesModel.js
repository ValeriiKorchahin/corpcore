import Sequelize from 'sequelize';
import { sequelize } from '../database/database.js';
import { CompanyRoles } from '../utils/enums/company-roles.js';

const UserCompanyModel = sequelize.define('UserCompanies', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    role: {
        type: Sequelize.INTEGER,
        defaultValue: CompanyRoles.USER,
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default UserCompanyModel;
