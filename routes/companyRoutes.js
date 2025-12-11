import express from 'express';
import { getCompanies } from '../controllers/companyController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, getCompanies);

export default router;
