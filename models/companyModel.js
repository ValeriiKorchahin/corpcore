import Sequelize from 'sequelize';
import { sequelize } from '../database/database.js';

const CompanyModel = sequelize.define('companies', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    logoUrl: {
        type: Sequelize.STRING(255),
        defaultValue: null,
        allowNull: true,
    },
    country: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    organizationId: {
        type: Sequelize.UUID,
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default CompanyModel;
