import Sequelize from 'sequelize';
import { sequelize } from '../database/database.js';

const OrganizationModel = sequelize.define('organizations', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
    },
}, {
    timestamps: true,
});

export default OrganizationModel;
