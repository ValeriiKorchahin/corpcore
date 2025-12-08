import Sequelize from 'sequelize';
import { sequelize } from '../database/database.js';

const UserModel = sequelize.define('users', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default UserModel;

