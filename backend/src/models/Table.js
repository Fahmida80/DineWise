// models/Table.js
import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  status: { type: String, enum: ['available', 'occupied', 'merged'], default: 'available' },
  mergedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "Table" }],
  seats: { type: Number, required: true }
}, { timestamps: true });

const Table = mongoose.model("Table", tableSchema);

export default Table;