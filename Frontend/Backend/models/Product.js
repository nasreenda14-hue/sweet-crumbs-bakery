import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true],
      unique: true,
    },
    price: {
      type: Number,
      required: [true],
      min: [0],
    },
    description: {
      type: String,
      required: [true],
      maxlength: [1000],
    },
    image: {
      type: String,
      required: [true],
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
