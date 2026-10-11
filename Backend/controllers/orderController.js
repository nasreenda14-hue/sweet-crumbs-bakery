import Order from "../models/Order.js";
import Product from "../models/Product.js";

const createOrder = async (req, res) => {
  try {
    const {
      name,
      phone,
      productId,
      quantity,
      message,
      address,
      paymentMethod,
      demoPaymentSuccess,
    } = req.body;

    if (
      !name?.trim() ||
      !phone?.trim() ||
      !productId ||
      !address?.trim()
    ) {
      return res.status(400).json({
        message: "Name, phone, product, and address are required",
      });
    }

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 100
    ) {
      return res.status(400).json({
        message: "Quantity must be a whole number between 1 and 100",
      });
    }

    if (!["cod", "upi", "card"].includes(paymentMethod)) {
      return res.status(400).json({
        message: "Invalid payment method",
      });
    }

    const selectedProduct = await Product.findById(productId);

    if (!selectedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const totalAmount = selectedProduct.price * quantity;

    // Demo only: never use this simulated result for real payments.
    const paymentStatus =
      paymentMethod === "cod"
        ? "pending"
        : demoPaymentSuccess === true
          ? "paid"
          : "failed";

    const newOrder = await Order.create({
      name: name.trim(),
      phone: phone.trim(),
      product: selectedProduct._id,
      quantity,
      message: message?.trim() || "",
      address: address.trim(),
      paymentMethod,
      paymentStatus,
      totalAmount,
    });

    return res.status(201).json({
      message: "Order submitted successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      message: "Unable to create order",
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("product", "name price image")
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Get orders error:", error);

    return res.status(500).json({
      message: "Unable to retrieve orders",
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "prepared",
      "delivered",
      "cancel",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate("product", "name price image");

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order status updated successfully",
      updatedOrder,
    });
  } catch (error) {
    console.error("Update order error:", error);

    return res.status(500).json({
      message: "Unable to update order status",
    });
  }
};

export { createOrder, getAllOrders, updateStatus };
