const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const { auth, authorize } = require('../middleware/auth');

// Public routes
router.get('/plans', subscriptionController.getAllPlans);
router.get('/plans/:planName', subscriptionController.getPlan);

// Protected routes (Agency only)
router.post(
  '/subscribe',
  auth,
  authorize('agency'),
  subscriptionController.subscribeToPlan
);

router.get(
  '/status',
  auth,
  authorize('agency'),
  subscriptionController.getSubscriptionStatus
);

router.post(
  '/cancel',
  auth,
  authorize('agency'),
  subscriptionController.cancelSubscription
);

module.exports = router;
