const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { auth, authorize, checkSubscription } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', propertyController.getAllProperties);
router.get('/:id', propertyController.getProperty);

// Protected routes (Agency/Broker only)
router.post(
  '/',
  auth,
  authorize('agency', 'broker'),
  checkSubscription,
  upload.array('images', 10),
  propertyController.createProperty
);

router.put(
  '/:id',
  auth,
  authorize('agency', 'broker'),
  checkSubscription,
  upload.array('images', 10),
  propertyController.updateProperty
);

router.delete(
  '/:id',
  auth,
  authorize('agency', 'broker'),
  propertyController.deleteProperty
);

router.get(
  '/agency/my-properties',
  auth,
  authorize('agency', 'broker'),
  propertyController.getAgencyProperties
);

module.exports = router;
