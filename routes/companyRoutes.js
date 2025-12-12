import express from 'express';
import { createCompany, getCompanies } from '../controllers/companyController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get All Companies
router.post('/list', authMiddleware, getCompanies);

// Create Company
router.post('/', authMiddleware, createCompany);

export default router;
