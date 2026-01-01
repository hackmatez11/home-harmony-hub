import express from 'express';
import {
  register,
  login,
  registerAgency,
  getProfile,
} from '../controllers/authController.js';

import { auth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/register-agency', registerAgency);

// Protected routes
router.get('/profile', auth, getProfile);

export default router;
