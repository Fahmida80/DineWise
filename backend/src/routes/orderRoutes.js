// routes/orderRoutes.js

import express from "express";
import {
  placeOrder,
  getKitchenOrders,
  getBarOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  getOrderById
} from "../controllers/orderController.js";

const router = express.Router();

router.get('/', getAllOrders);
router.post("/", placeOrder);
router.get("/kitchen", getKitchenOrders);
router.get("/bar", getBarOrders);
router.put("/:id/status", updateOrderStatus);
router.delete("/:id", cancelOrder);
router.get("/:id", getOrderById);

export default router;
