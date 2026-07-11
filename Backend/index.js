import express from "express";
import cors from 'cors'
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())

connectDB()

app.use("/api/v1",productRoutes)
app.use("/api/v1",authRoutes)



app.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`);
});