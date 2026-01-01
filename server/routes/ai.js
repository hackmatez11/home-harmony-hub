import express from 'express';
import { chatbot, voiceBot } from '../controllers/aiController.js';

const router = express.Router();

// Public AI endpoints
router.post('/chatbot', chatbot);
router.post('/voicebot', voiceBot);

export default router;
