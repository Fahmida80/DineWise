import mongoose from 'mongoose';

const saladIngredientSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Ingredient name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['greens', 'proteins', 'veggies', 'toppings', 'dressings'],
      message: 'Category must be: greens, proteins, veggies, toppings, or dressings'
    },
    lowercase: true
  },
  pricePerGram: { 
    type: Number, 
    required: [true, 'Price per gram is required'],
    min: [1, 'Price must be at least 1 BDT per gram'], // Changed to 1 BDT min
    default: 1, // Default to 1 BDT per gram
    set: val => Math.round(val * 100) / 100 // Round to 2 decimal places
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  tags: [{
    type: String,
    enum: [
      'high-protein', 'low-carb', 'vegan', 'vegetarian', 
      'low-calorie', 'high-fiber', 'gluten-free', 'dairy-free',
      'keto', 'paleo', 'nut-free'
    ]
  }],
  imageUrl: {
    type: String,
    default: '',
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true 
});

// Create index for better query performance
saladIngredientSchema.index({ category: 1, isActive: 1 });
saladIngredientSchema.index({ tags: 1, isActive: 1 });

// Virtual for price per 100g (useful for display)
saladIngredientSchema.virtual('pricePer100g').get(function() {
  return Math.round((this.pricePerGram * 100) * 100) / 100;
});

// Ensure virtual fields are serialized when converted to JSON
saladIngredientSchema.set('toJSON', { virtuals: true });

const SaladIngredient = mongoose.model('SaladIngredient', saladIngredientSchema);

export default SaladIngredient;