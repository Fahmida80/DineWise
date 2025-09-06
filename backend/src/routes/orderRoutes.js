// routes/orderRoutes.js

import express from "express";
import {
  placeOrder,
  getKitchenOrders,
  getBarOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  getOrderById,
  placeSaladOrder
} from "../controllers/orderController.js";

import protectRoute from '../middleware/protectRoute.js';


const router = express.Router();

router.get('/', protectRoute(['staff']), getAllOrders);
router.post("/", placeOrder);
router.get("/kitchen", protectRoute(['staff']), getKitchenOrders);
router.get("/bar", protectRoute(['staff']), getBarOrders);
router.put("/:id/status", protectRoute(['staff']),updateOrderStatus);
router.delete("/:id",protectRoute(['staff']), cancelOrder);
router.get("/:id",protectRoute(['staff']), getOrderById);
router.post("/salad-order", placeSaladOrder);

export default router;
