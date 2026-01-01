import express from 'express';
import {
  getAllPlans,
  getPlan,
  subscribeToPlan,
  getSubscriptionStatus,
  cancelSubscription,
} from '../controllers/subscriptionController.js';

import { auth, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/plans', getAllPlans);
router.get('/plans/:planName', getPlan);

// Protected routes (Agency only)
router.post('/subscribe', auth, authorize('agency'), subscribeToPlan);

router.get('/status', auth, authorize('agency'), getSubscriptionStatus);

router.post('/cancel', auth, authorize('agency'), cancelSubscription);

export default router;
