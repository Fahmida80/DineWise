import express from 'express';
import {
  getAllIngredients,
  getRecommendations,
  calculatePrice
} from '../controllers/saladBuilderController.js';

const router = express.Router();

// GET /api/salad/ingredients - Get all salad ingredients
router.get('/ingredients', getAllIngredients);

// POST /api/salad/recommend - Get AI recommendations based on dietary goal
router.post('/recommend', getRecommendations);

// POST /api/salad/calculate-price - Calculate total price for selected items
router.post('/calculate-price', calculatePrice);

export default router;