import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

const PORT=process.env.PORT||5000

app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

connectDB();

app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1/orders",orderRoutes)

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
