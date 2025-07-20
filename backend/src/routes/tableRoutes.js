import express from "express";
import { getTables, getTableById, createTable, updateTableStatus, mergeTables, splitTables, deleteTable } from "../controllers/tableController.js";

const router = express.Router();

// Live Table Availability (Feature 1)
router.get("/", getTables);
router.get("/:id", getTableById);
router.post("/", createTable);
router.put("/:id/status", updateTableStatus);
router.post("/merge", mergeTables);
router.post("/split", splitTables);
router.delete("/:id", deleteTable);
// Export the router

export default router;


