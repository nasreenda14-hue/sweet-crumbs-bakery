import express from "express";
import {createProduct,getAllProduct,getSingleProduct,updateProduct,deleteProduct} from "../controllers/productController.js";
import protect from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/product",protect,createProduct);
router.get("/product",getAllProduct)
router.get("/product/:id",getSingleProduct)
router.put("/product/:id",protect,updateProduct)
router.delete("/product/:id",protect,deleteProduct)

export default router;
