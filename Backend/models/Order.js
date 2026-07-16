import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true],
    },
    phone: {
      type: String,
      required: [true],
    },
    product:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    message: {
      type: String,
      required: [true],
      maxlength: [1000],
    },
    status: {
      type: String,
      enum: ["pending", "prepared", "delivered", "cancel"],
      default:"pending",
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
