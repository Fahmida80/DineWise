import express from 'express';
import {reduceIngredientStock, addIngredientStock, checkLowStock, listAllIngredients, addBulkIngredientStock } from '../controllers/inventoryController.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();



// Add stock to an ingredient
router.post('/ingredients/addStock',protectRoute(['staff']), addIngredientStock);

// Check for low stock items
router.get('/ingredients/lowStock',protectRoute(['staff']), checkLowStock);

// List all ingredients
router.get('/ingredients', protectRoute(['staff']),listAllIngredients);

router.patch('/ingredients/reduceStock/:ingredientId', protectRoute(['staff']), async (req, res) => {
    const { ingredientId } = req.params;
    const { quantityToReduce } = req.body;  // The quantity to reduce from stock
  
    try {
      if (quantityToReduce <= 0) {
        return res.status(400).json({ message: "Quantity to reduce must be greater than 0" });
      }
  
      // Call the reduceIngredientStock function from the inventoryController
      const updatedIngredient = await reduceIngredientStock(ingredientId, quantityToReduce);
  
      res.status(200).json({ message: "Stock updated successfully", ingredient: updatedIngredient });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
router.post('/ingredients/addBulkStock', protectRoute(['staff']), addBulkIngredientStock);

export default router;
