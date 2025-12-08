// import { sequelize } from '../database/database.js';
// import { CompanyModel } from '../models/index.js';
// import { Op } from 'sequelize';
// import { ConflictError } from '../utils/errors/ConflictError.js';
//
// export const createCompany = async(value) => {
//     const transaction = await sequelize.transaction();
//     const { email, name } = value;
//
//     try {
//         const existingCompany = await CompanyModel.findOne({
//             where: {
//                 [Op.or]: {
//                     email,
//                     name,
//                 },
//             },
//             transaction,
//         });
//         if (existingCompany) {
//             throw new ConflictError('Company already exists.');
//         }
//     } catch(err) {
//
//     }
// }
