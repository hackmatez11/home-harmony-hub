const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Public AI endpoints
router.post('/chatbot', aiController.chatbot);
router.post('/voicebot', aiController.voiceBot);

module.exports = router;
