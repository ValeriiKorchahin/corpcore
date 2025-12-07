import Sequelize from 'sequelize';
import { sequelize } from '../database/database.js';

const CompanyModel = sequelize.define('company', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    logoUrl: {
        type: Sequelize.STRING,
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    indexes: [
        { unique: true, fields: ['organizationId', 'name'] }, // company names unique per org
        { unique: true, fields: ['email'] }, // global unique email
    ],
});

export default CompanyModel;
