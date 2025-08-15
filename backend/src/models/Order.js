// models/Order.js
// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   table: { type: mongoose.Schema.Types.ObjectId, ref: "Table", required: true },
//   items: [
//     {
//       name: String,
//       quantity: Number,
//       notes: String, // e.g. "no onions"
//       category: { type: String, enum: ['kitchen', 'bar'] }
//     }
//   ],
//   status: { type: String, enum: ['pending', 'preparing', 'served'], default: 'pending' }
// }, { timestamps: true });


// const Order = mongoose.model("Order", orderSchema);



// export default Order;

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true }, // Reference to Table model
  items: [
    {
      name: { type: String, required: true }, // Name of the menu item
      quantity: { type: Number, required: true }, // Quantity ordered
      category: { type: String, enum: ['kitchen', 'bar'], required: true } // Category of the item
    }
  ],
  status: { type: String, enum: ['pending', 'preparing', 'served'], default: 'pending' } // Order status
});

export default mongoose.model('Order', orderSchema);
