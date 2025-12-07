import bcrypt from 'bcrypt';
import UserModel  from '../models/userModel.js';
import  OrganizationModel  from '../models/organizationModel.js';
import { sequelize } from '../database/database.js';
import Role from '../utils/enums/roles.js';
import { UnauthorizedError } from '../utils/errors/UnauthorizedError.js';
import { ConflictError } from '../utils/errors/ConflictError.js';
import UserRole from '../utils/enums/roles.js';
import UserOrganizations from '../models/userOrganizationsModel.js';


export const registerUser = async(value) => {
    const transaction = await sequelize.transaction();
    const { email, password, name, organizationName } = value;

    try {
        // Check if user exists
        const existingUser = await UserModel.findOne({ where: { email }, transaction });
        if (existingUser) {
            throw new ConflictError('User already exists.');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            role: Role.MANAGER, // global app role
        }, { transaction });

        // Create organization
        const organization = await OrganizationModel.create({
            name: organizationName,
        }, { transaction });

        // Add user to UserOrganizations as owner
        await UserOrganizations.create({
            userId: user.id,
            organizationId: organization.id,
            role: UserRole.MANAGER,
        }, { transaction });

        await transaction.commit();

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            organization: {
                id: organization.id,
                name: organization.name,
            },
        };

    } catch (err) {
        await transaction.rollback();
        throw new Error(`An error occurred: ${err.message}`);
    }
};

export const loginUser = async(value) => {
    const { email, password } = value;

    const user = await UserModel.findOne({
        where: { email },
        include: [
            {
                model: OrganizationModel,
                as: 'organizations',
                through: { attributes: ['role'] }, // include role info
            },
        ],
    });

    if (!user) {
        throw new UnauthorizedError('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new UnauthorizedError('Invalid email or password');
    }

    // Remove password from response
    const userData = user.toJSON();
    delete userData.password;

    return userData;
};

