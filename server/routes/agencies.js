import express from 'express';
import {
  getAllAgencies,
  getAgencyById,
  getAgency,
  updateAgency,
  getDashboardStats,
} from '../controllers/agencyController.js';

import { auth, authorize } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/all', getAllAgencies);
router.get('/public/:id', getAgencyById);

// Protected routes (Agency only)
router.get('/profile', auth, authorize('agency'), getAgency);

router.put(
  '/profile',
  auth,
  authorize('agency'),
  upload.single('logo'),
  updateAgency
);

router.get(
  '/dashboard/stats',
  auth,
  authorize('agency'),
  getDashboardStats
);

export default router;
