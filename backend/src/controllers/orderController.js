import Order from "../models/Order.js";
import Table from "../models/Table.js";
import mongoose from 'mongoose';



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
export const placeOrder = async (req, res) => {
  try {
    const { tableNumber, items } = req.body;

    // Validate table by number
    const existingTable = await Table.findOne({ number: tableNumber });
    if (!existingTable) {
      return res.status(404).json({ message: "Table not found" });
    }

    // Use the _id of the found table for the order
    const newOrder = new Order({ table: existingTable._id, items });
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
