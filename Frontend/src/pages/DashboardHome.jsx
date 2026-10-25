
import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderTable from "../components/OrderTable";

const API_URL = import.meta.env.VITE_API_URL;

function DashboardHome() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError("");

      try {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please log in again.");
  }

  const [productRes, orderRes] = await Promise.all([
    axios.get(`${API_URL}/api/v1/product`),

    axios.get(`${API_URL}/api/v1/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  ]);

  const productData = productRes.data;
  const orderData = orderRes.data;

  setProducts(
    Array.isArray(productData)
      ? productData
      : Array.isArray(productData.products)
        ? productData.products
        : Array.isArray(productData.product)
          ? productData.product
          : []
  );

  setOrders(
    Array.isArray(orderData)
      ? orderData
      : Array.isArray(orderData.orders)
        ? orderData.orders
        : []
  );
} catch (err) {
  console.error(
    "DASHBOARD ERROR:",
    err.response?.data || err.message
  );

  setError(
    err.response?.data?.message ||
      err.message ||
      "Unable to load dashboard data. Please refresh."
  );
} finally {
  setLoading(false);
}
    };

    fetchDashboardData();
  }, []);

  const pendingCount = orders.filter(
    (order) => order.status === "pending"
  ).length;

  const preparedCount = orders.filter(
    (order) => order.status === "prepared"
  ).length;

  const deliveredCount = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  const cancelledCount = orders.filter(
    (order) => order.status === "cancel"
  ).length;

  const totalSales = orders
    .filter((order) => order.status === "delivered")
    .reduce(
      (total, order) => total + Number(order.totalAmount || 0),
      0
    );

  const summaryCards = [
    {
      title: "Total Orders",
      value: orders.length,
      color: "border-amber-500",
      text: "text-amber-700",
    },
    {
      title: "Pending",
      value: pendingCount,
      color: "border-yellow-500",
      text: "text-yellow-700",
    },
    {
      title: "Prepared",
      value: preparedCount,
      color: "border-blue-500",
      text: "text-blue-700",
    },
    {
      title: "Delivered",
      value: deliveredCount,
      color: "border-green-500",
      text: "text-green-700",
    },
    {
      title: "Cancelled",
      value: cancelledCount,
      color: "border-red-500",
      text: "text-red-700",
    },
    {
      title: "Delivered Sales",
      value: `₹${totalSales.toFixed(2)}`,
      color: "border-emerald-500",
      text: "text-emerald-700",
    },
  ];

  return (
    <div className="w-full min-w-0 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">
          Dashboard
        </h1>
        <p className="mt-2 text-gray-500">
          Welcome to your Sweet Crumbs Bakery admin panel.
        </p>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Order Overview
          </h2>
          <span className="text-sm text-gray-500">
            {loading ? "Loading..." : "Live data"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {summaryCards.map((card) => (
            <div
              key={card.title}
              className={`rounded-2xl border border-gray-100 border-l-4 ${card.color} bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md`}
            >
              <p className="text-sm font-medium text-gray-500">
                {card.title}
              </p>

              <p className={`mt-3 text-3xl font-extrabold ${card.text}`}>
                {loading ? "—" : card.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          Product Overview
        </h2>

        <p className="mt-3 text-gray-500">
          Total product items
        </p>

        <p className="mt-1 text-3xl font-extrabold text-amber-700">
          {loading ? "Loading..." : products.length}
        </p>
      </section>

      <section>
        <OrderTable />
      </section>
    </div>
  );
}

export default DashboardHome;
