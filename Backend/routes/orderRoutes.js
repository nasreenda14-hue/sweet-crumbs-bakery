import express from "express";
import { createOrder, getAllOrders, updateStatus } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder)
router.get("/", getAllOrders)
router.put("/:id/status",updateStatus)

export default router;