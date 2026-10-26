import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient, { API_BASE_URL } from "../api/axios";

function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    quantity: 1,
    address: "",
    message: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [orderId, setOrderId] = useState("");

  // Return to products if no product was selected
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold">No product selected</h2>
        <p className="mt-2 text-gray-600">
          Please select a product before placing an order.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-5 rounded-lg bg-amber-600 px-6 py-3 text-white"
        >
          Browse Products
        </button>
      </div>
    );
  }

  const price = Number(product.price) || 0;
  const total = price * Number(form.quantity);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setError("Please fill in your name, phone number, and delivery address.");
      return;
    }

    if (!/^[0-9+\-\s()]{7,20}$/.test(form.phone.trim())) {
      setError("Please enter a valid phone number.");
      return;
    }

    const productId = product._id || product.id;

    if (!productId) {
      setError("Product ID is missing. Please select the product again.");
      return;
    }

    if (
      !Number.isInteger(Number(form.quantity)) ||
      Number(form.quantity) < 1 ||
      Number(form.quantity) > 100
    ) {
      setError("Quantity must be between 1 and 100.");
      return;
    }

    if (paymentMethod !== "Cash on Delivery") {
      setError(
        "Online payment is not connected yet. Please select Cash on Delivery.",
      );
      return;
    }

     const token = localStorage.getItem("token");

  if (!token) {
    setError("Please log in before placing your order.");
    navigate("/login");
    return;
  }

    setLoading(true);

    try {
      const orderData = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        productId,
        quantity: Number(form.quantity),
        address: form.address.trim(),
        message: form.message.trim(),
        paymentMethod: "cod",
      };

      console.log("ORDER DATA:", orderData);

      

      const response = await apiClient.post(
        "/api/v1/order",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("ORDER CREATED:", response.data);

      const savedOrderId = response.data.order?._id;

      if (!savedOrderId) {
        setError(
          "Order placed, but the Order ID could not be retrieved. Please contact us before placing another order.",
        );
        return;
      }
       setOrderId(savedOrderId);
    setSuccess("Your order was placed successfully!");


      

      setForm({
        name: "",
        phone: "",
        quantity: 1,
        address: "",
        message: "",
      });
    } catch (err) {
      console.error("ORDER ERROR:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          "Unable to place your order. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf4] px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          Place Your Order
        </h1>
        <p className="mb-10 text-center text-gray-600">
          Freshly baked, made with love.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Selected product */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-5 text-xl font-bold">Your Product</h2>

            {product.image && (
              <img
                src={
                  product.image.startsWith("http")
                    ? product.image
                    : `${API_BASE_URL}/${product.image
                        .replace(/\\/g, "/")
                        .replace(/^\/+/, "")}`
                }
                alt={product.name}
                className="mb-5 h-56 w-full rounded-xl object-cover"
              />
            )}

            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="mt-2 text-gray-600">Price: ₹{price.toFixed(2)}</p>

            <div className="mt-5 flex items-center justify-between border-t pt-4">
              <span className="font-semibold">Total</span>
              <span className="text-2xl font-bold text-amber-700">
                ₹{total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Order form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl bg-white p-6 shadow-md"
          >
            <h2 className="text-xl font-bold">Delivery Details</h2>

            <div>
              <label className="mb-2 block font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-3 outline-none focus:border-amber-600"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-3 outline-none focus:border-amber-600"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Delivery Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                rows="3"
                className="w-full rounded-lg border p-3 outline-none focus:border-amber-600"
                placeholder="Enter your full delivery address"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Quantity</label>
              <input
                type="number"
                name="quantity"
                min="1"
                max="100"
                value={form.quantity}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-3 outline-none focus:border-amber-600"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Additional Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="2"
                className="w-full rounded-lg border p-3 outline-none focus:border-amber-600"
                placeholder="Any special instructions?"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full rounded-lg border p-3 outline-none focus:border-amber-600"
              >
                <option>Cash on Delivery</option>
                <option>UPI / Online Payment</option>
              </select>
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            {success && (
              <div
                role="status"
                className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800"
              >
                <p className="font-semibold">{success}</p>

                <p className="mt-2 break-all text-sm">
                  <span className="font-semibold">Your Order ID:</span>{" "}
                  {orderId}
                </p>

                <p className="mt-2 text-sm">
                  Please save this Order ID. You will need it to check your
                  order status.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#c97a28] px-6 py-3 font-semibold text-white transition hover:bg-[#a8611d] disabled:opacity-60"
            >
              {loading
                ? "Placing Order..."
                : `Place Order · ₹${total.toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Order;
