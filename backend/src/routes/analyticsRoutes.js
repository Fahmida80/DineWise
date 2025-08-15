// routes/analyticsRoutes.js
import express from 'express';
import { getDishPopularity } from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/dish-popularity', getDishPopularity);

export default router;
