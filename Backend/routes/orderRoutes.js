import express from "express";
import { checkOrderStatus, createOrder, getAllOrders, getMyOrders, updateStatus } from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/",authMiddleware, createOrder)
router.post("/check-status",authMiddleware, checkOrderStatus)

router.get("/my-orders", authMiddleware, getMyOrders);
router.get("/",authMiddleware,adminMiddleware, getAllOrders)
router.put("/:id",authMiddleware,adminMiddleware,updateStatus)


export default router;