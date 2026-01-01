import express from 'express';
import {
  getAllProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getAgencyProperties,
} from '../controllers/propertyController.js';

import { auth, authorize, checkSubscription } from '../middleware/auth.js';
import { uploadMultiple } from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllProperties);
router.get('/:id', getProperty);

// Protected routes (Agency/Broker only)
router.post(
  '/',
  auth,
  authorize('agency', 'broker'),
  checkSubscription,
  uploadMultiple,
  createProperty
);

router.put(
  '/:id',
  auth,
  authorize('agency', 'broker'),
  checkSubscription,
  uploadMultiple,
  updateProperty
);

router.delete(
  '/:id',
  auth,
  authorize('agency', 'broker'),
  deleteProperty
);

router.get(
  '/agency/my-properties',
  auth,
  authorize('agency', 'broker'),
  getAgencyProperties
);

export default router;
