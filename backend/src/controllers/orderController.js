import Order from "../models/Order.js";
import Table from "../models/Table.js";
import MenuItem from '../models/MenuItem.js';
import mongoose from 'mongoose';
import { reduceIngredientStock } from '../controllers/inventoryController.js'; // Import reduceIngredientStock function


// controllers/orderController.js
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('table');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Place a new order using tableNumber instead of table _id
// export const placeOrder = async (req, res) => {
//   try {
//     const { tableNumber, items } = req.body;

//     // Validate table by number
//     const existingTable = await Table.findOne({ number: tableNumber });
//     if (!existingTable) {
//       return res.status(404).json({ message: "Table not found" });
//     }

//     // Use the _id of the found table for the order
//     const newOrder = new Order({ table: existingTable._id, items });
//     await newOrder.save();

//     res.status(201).json({ message: "Order placed successfully", order: newOrder });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const placeOrder = async (req, res) => {
  try {
    const { tableNumber, items } = req.body;

    // Step 1: Find the table by number
    const existingTable = await Table.findOne({ number: tableNumber });
    if (!existingTable) {
      return res.status(404).json({ message: "Table not found" });
    }

    // Step 2: Initialize an array to store updated ingredients
    const updatedIngredients = [];

    // Step 3: Loop through each item in the order
    for (const item of items) {
      // Step 4: Fetch the menu item and populate ingredient details
      const menuItem = await MenuItem.findOne({ name: item.name }).populate('ingredients.ingredientId');
      if (!menuItem) {
        return res.status(404).json({ message: `Menu item ${item.name} not found` });
      }

      // Step 5: Loop through each ingredient in the menu item
      for (const ingredient of menuItem.ingredients) {
        const ingredientData = ingredient.ingredientId;
        const quantityUsed = ingredient.quantity * item.quantity;  // Total quantity of ingredient used

        // Step 6: Reduce stock of this ingredient using the inventoryController's function
        try {
          // Call the reduceIngredientStock function to reduce stock
          await reduceIngredientStock(ingredientData._id, quantityUsed);  // Reduce the stock
          updatedIngredients.push(ingredientData); // Track the updated ingredients
        } catch (error) {
          return res.status(400).json({ message: `Error reducing stock for ingredient: ${ingredientData.name}`, error: error.message });
        }
      }
    }

    // Step 7: Create and save the order
    const newOrder = new Order({ table: existingTable._id, items });
    await newOrder.save();

    // Step 8: Respond with success message
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ message: "Error placing the order", error: error.message });
  }
};




// Get all kitchen orders
export const getKitchenOrders = async (req, res) => {
  try {
    const orders = await Order.find({ "items.category": "kitchen" }).populate("table");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bar orders
export const getBarOrders = async (req, res) => {
  try {
    const orders = await Order.find({ "items.category": "bar" }).populate("table");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order by ID

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate("table");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update order status
// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const updatedOrder = await Order.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true, runValidators: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const updateOrderStatus = async (req, res) => {
  try {
    // Add validation
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid order ID format" });
    }

    const { status } = req.body;
    const validStatuses = ['pending', 'preparing', 'served'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Cancel an order
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order cancelled successfully", order: deletedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// orderController.js - Update placeSaladOrder function
export const placeSaladOrder = async (req, res) => {
  try {
    const { tableNumber, saladItems, totalPrice } = req.body;

    // Validate table
    const existingTable = await Table.findOne({ number: tableNumber });
    if (!existingTable) {
      return res.status(404).json({ message: "Table not found" });
    }

    // DON'T reduce inventory for salad ingredients - they're separate!
    // Salad ingredients are for custom bowls, not part of regular inventory
    console.log('Salad ingredients used:', saladItems.map(item => ({
      name: item.name,
      weight: item.weightInGrams
    })));

    // Create order with custom salad
    const orderItems = [{
      name: `Custom Salad Bowl - ${saladItems.map(i => `${i.name} (${i.weightInGrams}g)`).join(', ')}`,
      quantity: 1,
      category: 'kitchen',
      price: totalPrice
    }];

    const newOrder = new Order({
      table: existingTable._id,
      items: orderItems,
      totalAmount: totalPrice
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Salad order placed successfully",
      order: newOrder
    });

  } catch (error) {
    console.error('Error placing salad order:', error);
    res.status(500).json({
      success: false,
      message: 'Error placing salad order',
      error: error.message
    });
  }
};