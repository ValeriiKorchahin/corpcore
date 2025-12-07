import Sequelize from 'sequelize';
import { sequelize } from '../database/database.js';

const OrganizationModel = sequelize.define('organization', {
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
}, {
    timestamps: true,
    indexes: [
        { unique: true, fields: ['name'] }, // optional, enforce global unique org names
    ],
});

export default OrganizationModel;
