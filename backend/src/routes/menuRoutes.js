import express from 'express';
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  // deleteAllItems
} from '../controllers/menuController.js';

import protectRoute from '../middleware/protectRoute.js';


const router = express.Router();

// Delete all menu items
// router.delete('/deleteAll', deleteAllItems);
// Get all menu items
router.get('/', getMenuItems);

// Create a new menu item
router.post('/', protectRoute(['staff']), createMenuItem);

// Update a menu item
router.put('/:id', protectRoute(['staff']), updateMenuItem);

// Delete a menu item
router.delete('/:id', protectRoute(['staff']), deleteMenuItem);



export default router;