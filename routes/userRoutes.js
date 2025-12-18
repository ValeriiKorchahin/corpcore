import express from 'express';
import { getUsers } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get All Users
router.post('/list', authMiddleware, getUsers);

export default router;

