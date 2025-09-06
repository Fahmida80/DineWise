import express from 'express';
import { getRecommendations, getAvailableTags } from '../controllers/recommendationController.js';

const router = express.Router();

// GET /api/recommendations?weather=cold&time=evening&mood=comfort
router.get('/recommendations', getRecommendations);

// GET /api/recommendations/tags
router.get('/recommendations/tags', getAvailableTags);

export default router;