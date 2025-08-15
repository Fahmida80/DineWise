import Order from '../models/Order.js'; // Import Order model
import mongoose from 'mongoose';

// Controller function to get dish popularity
export const getDishPopularity = async (req, res) => {
  try {
    const popularDishes = await Order.aggregate([
      { $unwind: "$items" }, // Unwind the items array
      {
        $group: {
          _id: "$items.name",
          totalQuantity: { $sum: "$items.quantity" }, // Sum the quantities for each item
        },
      },
      { $sort: { totalQuantity: -1 } }, // Sort by total quantity in descending order
      { $limit: 5 }, // Limit to top 5
    ]);

    res.status(200).json(popularDishes);
  } catch (err) {
    console.error('Error fetching dish popularity:', err);
    res.status(500).json({ error: 'Failed to fetch dish popularity' });
  }
};

