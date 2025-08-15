import Ingredient from '../models/Ingredient.js';  // Ingredient model
import mongoose from 'mongoose';

export const reduceIngredientStock = async (ingredientId, quantityToReduce) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(ingredientId)) {
      throw new Error("Invalid ingredient ID format");
    }

    const ingredient = await Ingredient.findById(ingredientId);
    if (!ingredient) {
      throw new Error("Ingredient not found");
    }

    if (ingredient.stock < quantityToReduce) {
      throw new Error("Not enough stock to reduce");
    }

    ingredient.stock -= quantityToReduce;  // Reduce the stock
    await ingredient.save();  // Save the updated ingredient

    return ingredient; // Return the updated ingredient
  } catch (error) {
    console.error(error);
    throw new Error(`Error reducing stock for ingredient ${ingredientId}: ${error.message}`);
  }
};

// Add stock to an ingredient
// export const addIngredientStock = async (req, res) => {
//   try {
//     const { ingredientId, quantityToAdd } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(ingredientId)) {
//       return res.status(400).json({ message: "Invalid ingredient ID format" });
//     }

//     const ingredient = await Ingredient.findById(ingredientId);
//     if (!ingredient) {
//       return res.status(404).json({ message: "Ingredient not found" });
//     }

//     ingredient.stock += quantityToAdd;  // Increase stock
//     await ingredient.save();  // Save updated stock

//     res.status(200).json({ message: `Stock updated successfully for ${ingredient.name}`, ingredient });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error updating ingredient stock", error: error.message });
//   }
// };

export const addIngredientStock = async (req, res) => {
  try {
    const { name, quantityToAdd } = req.body; // Expecting name and quantityToAdd

    if (!name || !quantityToAdd || quantityToAdd <= 0) {
      return res.status(400).json({ message: "Invalid ingredient name or quantity" });
    }

    // Find the ingredient by name
    const ingredient = await Ingredient.findOne({ name: name });

    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    // Add stock
    ingredient.stock += quantityToAdd;
    await ingredient.save();

    res.status(200).json({ message: `Stock updated successfully for ${ingredient.name}`, ingredient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating ingredient stock", error: error.message });
  }
};


// Check for low stock (ingredients below threshold)
export const checkLowStock = async (req, res) => {
    try {
      const lowStockIngredients = await Ingredient.find({
        stock: { $lte: 10 }  // Replace 10 with the desired threshold value
      });
  
      if (lowStockIngredients.length === 0) {
        return res.status(200).json({ message: "No ingredients are below the threshold" });
      }
  
      res.status(200).json({ lowStockIngredients });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error checking low stock items", error: error.message });
    }
  };

// List all ingredients with stock levels
export const listAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();

    if (ingredients.length === 0) {
      return res.status(404).json({ message: "No ingredients found" });
    }

    res.status(200).json({ ingredients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching ingredients", error: error.message });
  }
};
// Bulk add stock for multiple ingredients
export const addBulkIngredientStock = async (req, res) => {
  try {
    const ingredients = req.body.ingredients; // Array of ingredients to update

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ message: "Invalid input: expected an array of ingredients" });
    }

    const updatedIngredients = [];

    // Loop through each ingredient in the array and update stock
    for (const ingredientData of ingredients) {
      const { name, quantityToAdd } = ingredientData;

      if (!name || !quantityToAdd || quantityToAdd <= 0) {
        return res.status(400).json({ message: "Invalid ingredient name or quantity" });
      }

      const ingredient = await Ingredient.findOne({ name: name });

      if (!ingredient) {
        return res.status(404).json({ message: `Ingredient ${name} not found` });
      }

      // Update the stock
      ingredient.stock += quantityToAdd;
      await ingredient.save();

      updatedIngredients.push(ingredient);
    }

    res.status(200).json({ message: "Bulk stock update successful", updatedIngredients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating ingredient stock", error: error.message });
  }
};
