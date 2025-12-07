import Sequelize from 'sequelize';
import { sequelize } from '../database/database.js';

const UserOrganizations = sequelize.define('UserOrganizations', {
    role: {
        type: Sequelize.INTEGER,
    },
}, {
    timestamps: true,
    indexes: [
        { unique: true, fields: ['userId', 'organizationId'] }, // prevent duplicate memberships
    ],
});

export default UserOrganizations;
