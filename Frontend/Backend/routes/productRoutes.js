import express from "express";
import {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/product",
  upload.single("image"),
  authMiddleware,
  adminMiddleware,
  createProduct,
);
router.get("/product", getAllProduct);
router.get("/product/:id", getSingleProduct);
router.put("/product/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/product/:id", authMiddleware, adminMiddleware, deleteProduct);

export default router;
