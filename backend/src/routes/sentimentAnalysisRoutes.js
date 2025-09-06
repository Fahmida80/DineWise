// src/routes/sentimentAnalysisRoutes.js
import express from 'express';
import { analyzeFeedback } from '../controllers/sentimentAnalysisController.js';

const router = express.Router();

// POST /api/sentiment/analyze
router.post('/analyze', analyzeFeedback);

export default router;