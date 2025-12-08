import Sequelize from 'sequelize';
import { sequelize } from '../database/database.js';
import { OrganizationRoles } from '../utils/enums/organization-roles.js';

const UserOrganizationModel = sequelize.define('UserOrganizations', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    organizationId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    role: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: OrganizationRoles.USER,
    },
}, {
    timestamps: true,
});

export default UserOrganizationModel;
