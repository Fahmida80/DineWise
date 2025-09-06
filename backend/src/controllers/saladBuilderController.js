import SaladIngredient from '../models/SaladIngredient.js';

// GET all active salad ingredients
export const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await SaladIngredient.find({ isActive: true })
      .select('name category pricePerGram tags imageUrl')
      .sort({ category: 1, name: 1 });

    res.json({
      success: true,
      count: ingredients.length,
      data: ingredients
    });

  } catch (error) {
    console.error('Error fetching salad ingredients:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching ingredients'
    });
  }
};

// POST - AI Recommendation based on dietary goal
export const getRecommendations = async (req, res) => {
  try {
    const { goal } = req.body;

    if (!goal) {
      return res.status(400).json({
        success: false,
        message: 'Dietary goal is required'
      });
    }

    // Get all active ingredients
    const allIngredients = await SaladIngredient.find({ isActive: true });

    // AI LOGIC - Rule-based expert system
    let recommendedIngredients = [];
    
    switch (goal.toLowerCase()) {
      case 'high-protein':
        recommendedIngredients = allIngredients.filter(ingredient => 
          ingredient.tags.includes('high-protein')
        );
        break;

      case 'low-carb':
        recommendedIngredients = allIngredients.filter(ingredient => 
          ingredient.tags.includes('low-carb')
        );
        break;

      case 'vegan':
        recommendedIngredients = allIngredients.filter(ingredient => 
          ingredient.tags.includes('vegan')
        );
        break;

      case 'low-calorie':
        recommendedIngredients = allIngredients.filter(ingredient => 
          ingredient.tags.includes('low-calorie')
        );
        break;

      case 'high-fiber':
        recommendedIngredients = allIngredients.filter(ingredient => 
          ingredient.tags.includes('high-fiber')
        );
        break;

      default:
        // If goal not recognized, return all ingredients
        recommendedIngredients = allIngredients;
    }

    res.json({
      success: true,
      goal: goal,
      count: recommendedIngredients.length,
      recommendations: recommendedIngredients
    });

  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while generating recommendations'
    });
  }
};

// POST - Calculate total price for selected ingredients
export const calculatePrice = async (req, res) => {
  try {
    const { items } = req.body; // Array of { ingredientId, weightInGrams }

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'Items array is required'
      });
    }

    let totalPrice = 0;
    const detailedItems = [];

    // Calculate price for each item
    for (const item of items) {
      const ingredient = await SaladIngredient.findById(item.ingredientId);
      
      if (!ingredient || !ingredient.isActive) {
        continue; // Skip invalid or inactive ingredients
      }

      const itemTotal = ingredient.pricePerGram * item.weightInGrams;
      totalPrice += itemTotal;

      detailedItems.push({
        name: ingredient.name,
        category: ingredient.category,
        weightInGrams: item.weightInGrams,
        pricePerGram: ingredient.pricePerGram,
        itemTotal: Math.round(itemTotal * 100) / 100 // Round to 2 decimal places
      });
    }

    res.json({
      success: true,
      totalPrice: Math.round(totalPrice * 100) / 100, // Round to 2 decimal places
      currency: 'BDT',
      items: detailedItems
    });

  } catch (error) {
    console.error('Error calculating price:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while calculating price'
    });
  }
};