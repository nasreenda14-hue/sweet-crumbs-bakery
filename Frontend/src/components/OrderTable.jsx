import React, { useCallback, useEffect, useState } from "react";
import apiClient from "../api/axios";

function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError("");

   try {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please log in again.");
  }

  const response = await apiClient.get(
    "/api/v1/order",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = Array.isArray(response.data)
    ? response.data
    : response.data.orders || [];

  setOrders(data);
} catch (err) {
  console.error(
    "FETCH ORDERS ERROR:",
    err.response?.data || err.message
  );

  setError(
    err.response?.data?.message ||
      err.message ||
      "Unable to load orders. Please try again."
  );
} finally {
  setLoading(false);
}
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id);

      const token = localStorage.getItem("token");

const res = await apiClient.put(
  `/api/v1/order/${id}`,
  { status },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      const updatedOrder = res.data.updatedOrder;

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? { ...order, ...(updatedOrder || {}), status }
            : order
        )
      );
    } catch (err) {
      console.error("UPDATE STATUS ERROR:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          "Unable to update order status."
      );
      await fetchOrders();
    } finally {
      setUpdatingId("");
    }
  };

  if (loading) {
    return <p className="mt-6 text-gray-600">Loading orders...</p>;
  }

  return (
    <section className="mt-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Orders</h2>
          <p className="mt-1 text-sm text-gray-600">
            Total orders: {orders.length}
          </p>
        </div>

        <button
          type="button"
          onClick={fetchOrders}
          className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
        >
          Refresh Orders
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl bg-white shadow-md">
        <table className="min-w-[1500px] w-full text-left text-sm">
          <thead className="bg-gray-100 uppercase text-gray-700">
            <tr>
              {[
                "Order No.",
                "Date",
                "Customer",
                "Phone",
                "Product",
                "Quantity",
                "Total",
                "Payment",
                "Payment Status",
                "Delivery Address",
                "Message",
                "Order Status",
              ].map((heading) => (
                <th key={heading} className="px-4 py-3">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order._id} className="border-b align-top hover:bg-amber-50/40">
                  <td className="px-4 py-3 font-medium">
                    {order._id?.slice(-6).toUpperCase() || index + 1}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "—"}
                  </td>

                  <td className="px-4 py-3">{order.name || "—"}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {order.phone || "—"}
                  </td>

                  <td className="px-4 py-3">
                    {typeof order.product === "object"
                      ? order.product?.name || "Product unavailable"
                      : order.product || "—"}
                  </td>

                  <td className="px-4 py-3">{order.quantity ?? "—"}</td>

                  <td className="whitespace-nowrap px-4 py-3 font-semibold">
                    {order.totalAmount != null
                      ? `₹${Number(order.totalAmount).toFixed(2)}`
                      : typeof order.product === "object" &&
                          order.product?.price != null
                        ? `₹${(
                            Number(order.product.price) *
                            Number(order.quantity || 0)
                          ).toFixed(2)}`
                        : "—"}
                  </td>

                  <td className="px-4 py-3">
                    {order.paymentMethod === "cod"
                      ? "Cash on Delivery"
                      : order.paymentMethod || "—"}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        order.paymentStatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : order.paymentStatus === "failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {order.paymentStatus || "pending"}
                    </span>
                  </td>

                  <td className="max-w-xs whitespace-normal break-words px-4 py-3">
                    {order.address || "—"}
                  </td>

                  <td className="max-w-xs whitespace-normal break-words px-4 py-3">
                    {order.message || "—"}
                  </td>

                  <td className="px-4 py-3">
                    <select
                      value={order.status || "pending"}
                      disabled={updatingId === order._id}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="rounded-lg border border-gray-300 p-2 disabled:opacity-50"
                    >
                      <option value="pending">Pending</option>
                      <option value="prepared">Prepared</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancel">Cancelled</option>
                    </select>
                    {updatingId === order._id && (
                      <p className="mt-1 text-xs text-gray-500">Updating...</p>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} className="px-4 py-8 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default OrderTable;
