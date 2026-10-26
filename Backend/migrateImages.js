import "dotenv/config";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";
import Product from "./models/Product.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsFolder = path.join(__dirname, "uploads");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function migrateImages() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const products = await Product.find({
      image: { $not: /^https?:\/\//i },
    });

    console.log(`Found ${products.length} products to check`);

    for (const product of products) {
      const filename = path.basename(product.image);
      const imagePath = path.join(uploadsFolder, filename);

      if (!fs.existsSync(imagePath)) {
        console.log(`Image file missing: ${filename}`);
        continue;
      }

      const uploaded = await cloudinary.uploader.upload(imagePath, {
        folder: "sweet-crumbs-products",
        resource_type: "image",
      });

      product.image = uploaded.secure_url;
      await product.save();

      console.log(`Updated product: ${product.name}`);
    }

    console.log("Image migration finished");
  } catch (error) {
    console.error("Migration failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

migrateImages();
