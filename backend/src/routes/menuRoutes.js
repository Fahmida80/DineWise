import express from 'express';
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  // deleteAllItems
} from '../controllers/menuController.js';

const router = express.Router();

// Delete all menu items
// router.delete('/deleteAll', deleteAllItems);
// Get all menu items
router.get('/', getMenuItems);

// Create a new menu item
router.post('/', createMenuItem);

// Update a menu item
router.put('/:id', updateMenuItem);

// Delete a menu item
router.delete('/:id', deleteMenuItem);



export default router;