const express = require('express');
const router = express.Router();
const agencyController = require('../controllers/agencyController');
const { auth, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/all', agencyController.getAllAgencies);
router.get('/public/:id', agencyController.getAgencyById);

// Protected routes (Agency only)
router.get(
  '/profile',
  auth,
  authorize('agency'),
  agencyController.getAgency
);

router.put(
  '/profile',
  auth,
  authorize('agency'),
  upload.single('logo'),
  agencyController.updateAgency
);

router.get(
  '/dashboard/stats',
  auth,
  authorize('agency'),
  agencyController.getDashboardStats
);

module.exports = router;
