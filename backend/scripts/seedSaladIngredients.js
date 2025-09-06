import mongoose from 'mongoose';
import SaladIngredient from '../src/models/SaladIngredient.js';
import { connectDB } from '../src/config/db.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables - ADD THIS SECTION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });


const saladIngredients = [
    // GREENS (now 1.5-2.5 BDT/gram)
    {
      name: 'Lettuce',
      category: 'greens',
      pricePerGram: 1.5, // Was 0.5
      tags: ['low-calorie', 'vegan', 'vegetarian', 'low-carb'],
      description: 'Fresh crispy lettuce'
    },
    {
      name: 'Spinach',
      category: 'greens', 
      pricePerGram: 2.0, // Was 0.7
      tags: ['high-fiber', 'vegan', 'vegetarian', 'low-carb', 'low-calorie'],
      description: 'Nutritious spinach leaves'
    },
    {
      name: 'Kale',
      category: 'greens',
      pricePerGram: 2.5, // Was 0.9
      tags: ['high-fiber', 'vegan', 'vegetarian', 'low-carb', 'low-calorie'],
      description: 'Organic kale'
    },
  
    // PROTEINS (now 3.0-6.0 BDT/gram)
    {
      name: 'Grilled Chicken',
      category: 'proteins',
      pricePerGram: 6.0, // Was 2.5
      tags: ['high-protein', 'low-carb'],
      description: 'Tender grilled chicken strips'
    },
    {
      name: 'Tofu',
      category: 'proteins',
      pricePerGram: 4.0, // Was 1.8
      tags: ['high-protein', 'vegan', 'vegetarian', 'low-carb'],
      description: 'Firm tofu cubes'
    },
    {
      name: 'Chickpeas', 
      category: 'proteins',
      pricePerGram: 3.0, // Was 1.2
      tags: ['high-protein', 'vegan', 'vegetarian', 'high-fiber'],
      description: 'Boiled chickpeas'
    },
    {
      name: 'Boiled Eggs',
      category: 'proteins',
      pricePerGram: 3.5, // Was 1.5
      tags: ['high-protein', 'vegetarian'],
      description: 'Sliced boiled eggs'
    },
  
    // VEGGIES (now 1.5-2.5 BDT/gram)
    {
      name: 'Tomatoes',
      category: 'veggies',
      pricePerGram: 2.0, // Was 0.8
      tags: ['vegan', 'vegetarian', 'low-calorie', 'low-carb'],
      description: 'Fresh cherry tomatoes'
    },
    {
      name: 'Cucumbers',
      category: 'veggies',
      pricePerGram: 1.5, // Was 0.6
      tags: ['vegan', 'vegetarian', 'low-calorie', 'low-carb'],
      description: 'Sliced cucumbers'
    },
    {
      name: 'Carrots',
      category: 'veggies',
      pricePerGram: 2.0, // Was 0.7
      tags: ['vegan', 'vegetarian', 'high-fiber', 'low-calorie'],
      description: 'Shredded carrots'
    },
    {
      name: 'Bell Peppers',
      category: 'veggies',
      pricePerGram: 2.5, // Was 1.0
      tags: ['vegan', 'vegetarian', 'low-calorie', 'low-carb'],
      description: 'Colorful bell pepper strips'
    },
  
    // TOPPINGS (now 3.0-7.0 BDT/gram)
    {
      name: 'Feta Cheese',
      category: 'toppings',
      pricePerGram: 5.0, // Was 2.0
      tags: ['vegetarian', 'high-protein'],
      description: 'Crumbled feta cheese'
    },
    {
      name: 'Almonds',
      category: 'toppings',
      pricePerGram: 7.0, // Was 3.0
      tags: ['vegan', 'vegetarian', 'high-protein', 'high-fiber'],
      description: 'Toasted almond slices'
    },
    {
      name: 'Croutons',
      category: 'toppings',
      pricePerGram: 3.0, // Was 1.2
      tags: ['vegetarian'],
      description: 'Garlic croutons'
    },
    {
      name: 'Sunflower Seeds',
      category: 'toppings',
      pricePerGram: 6.0, // Was 2.5
      tags: ['vegan', 'vegetarian', 'high-protein', 'high-fiber'],
      description: 'Roasted sunflower seeds'
    },
  
    // DRESSINGS (now 3.0-5.0 BDT/gram)
    {
      name: 'Ranch Dressing',
      category: 'dressings',
      pricePerGram: 4.0, // Was 1.5
      tags: ['vegetarian'],
      description: 'Creamy ranch dressing'
    },
    {
      name: 'Balsamic Vinaigrette',
      category: 'dressings',
      pricePerGram: 3.5, // Was 1.3
      tags: ['vegan', 'vegetarian', 'low-calorie'],
      description: 'Tangy balsamic vinaigrette'
    },
    {
      name: 'Honey Mustard',
      category: 'dressings',
      pricePerGram: 4.5, // Was 1.6
      tags: ['vegetarian'],
      description: 'Sweet honey mustard dressing'
    },
    {
      name: 'Lemon Tahini',
      category: 'dressings',
      pricePerGram: 5.0, // Was 1.8
      tags: ['vegan', 'vegetarian', 'high-protein'],
      description: 'Creamy lemon tahini dressing'
    }
  ];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing ingredients
    await SaladIngredient.deleteMany({});
    console.log('Cleared existing salad ingredients');

    // Insert new ingredients
    await SaladIngredient.insertMany(saladIngredients);
    console.log(`Added ${saladIngredients.length} salad ingredients`);

    process.exit(0); // Success
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1); // Failure
  }
};

seedDatabase();