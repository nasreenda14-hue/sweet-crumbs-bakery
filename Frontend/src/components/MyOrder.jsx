import React, { useEffect, useState } from "react";
import apiClient, { API_BASE_URL } from "../api/axios";

const getProductImageUrl = (image) => {
  if (!image) return "";
  if (/^https?:\/\//i.test(image)) return image;

  const normalized = image.replace(/\\/g, "/");
  const filename = normalized.split("/").pop();

  return filename ? `${API_BASE_URL}/uploads/${filename}` : "";
};

const getStatusStyle = (status) => {
  switch (status) {
    case "pending":
      return "bg-amber-50 text-amber-700 ring-amber-200";
    case "prepared":
      return "bg-blue-50 text-blue-700 ring-blue-200";
    case "delivered":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200";
    case "cancel":
      return "bg-red-50 text-red-700 ring-red-200";
    default:
      return "bg-gray-100 text-gray-700 ring-gray-200";
  }
};

const formatStatus = (status) => {
  if (status === "cancel") return "Cancelled";
  if (!status) return "Unknown";

  return status.charAt(0).toUpperCase() + status.slice(1);
};

function MyOrder() {
  const [orders, setOrders] = useState([]);
  const [copiedOrderId, setCopiedOrderId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchMyOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        if (active) {
          setError("Please log in to view your orders.");
          setLoading(false);
        }
        return;
      }

      try {
        const response = await apiClient.get(
          "/api/v1/order/my-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (active) {
          setOrders(
            Array.isArray(response.data.orders)
              ? response.data.orders
              : []
          );
        }
      } catch (err) {
        console.error(
          "FETCH MY ORDERS ERROR:",
          err.response?.data || err.message
        );

        if (active) {
          setError(
            err.response?.status === 401
              ? "Your session has expired. Please log in again."
              : "Unable to load your orders. Please try again."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchMyOrders();

    return () => {
      active = false;
    };
  }, []);

  const copyOrderId = async (orderId) => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopiedOrderId(orderId);

      setTimeout(() => {
        setCopiedOrderId("");
      }, 2000);
    } catch {
      alert("Unable to copy. Please copy the Order ID manually.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fffaf4] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 border-b border-amber-100 pb-6 sm:mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">
            Sweet Crumbs Bakery
          </p>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                My Orders
              </h1>
              <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
                View your purchases and track your bakery orders.
              </p>
            </div>

            <div className="w-fit rounded-xl border border-amber-100 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs font-medium text-gray-500">
                Total orders
              </p>
              <p className="mt-1 text-2xl font-extrabold text-amber-800">
                {orders.length}
              </p>
            </div>
          </div>
        </div>

        {loading && (
          <p className="mb-4 text-sm text-gray-500">
            Loading your orders...
          </p>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => {
              const product =
                order.product && typeof order.product === "object"
                  ? order.product
                  : null;

              const imageUrl = getProductImageUrl(product?.image);
              const orderId = order._id;

              return (
                <article
                  key={orderId}
                  className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 border-b border-gray-100 bg-gray-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Order ID
                      </p>
                      <p className="mt-1 break-all text-sm font-bold text-gray-900">
                        {orderId}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold ring-1 ring-inset ${getStatusStyle(order.status)}`}
                      >
                        {formatStatus(order.status)}
                      </span>

                      <button
                        type="button"
                        onClick={() => copyOrderId(orderId)}
                        disabled={!orderId}
                        className="rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm font-semibold text-amber-800 transition hover:bg-amber-50 disabled:opacity-50"
                      >
                        {copiedOrderId === orderId ? "Copied!" : "Copy ID"}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_280px]">
                    <div className="flex min-w-0 flex-col gap-4 sm:flex-row">
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={product?.name || "Bakery product"}
                          className="h-36 w-full shrink-0 rounded-xl bg-amber-50 object-cover sm:h-32 sm:w-32"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      )}

                      <div className="min-w-0 flex-1">
                        <h2 className="text-xl font-bold text-gray-900">
                          {product?.name || "Product unavailable"}
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                          Freshly prepared with care by Sweet Crumbs Bakery.
                        </p>

                        <div className="mt-5 grid grid-cols-2 gap-4">
                          <div className="rounded-xl bg-[#fffaf4] p-3">
                            <p className="text-xs font-medium text-gray-500">
                              Quantity
                            </p>
                            <p className="mt-1 text-lg font-bold text-gray-900">
                              {order.quantity}
                            </p>
                          </div>

                          <div className="rounded-xl bg-[#fffaf4] p-3">
                            <p className="text-xs font-medium text-gray-500">
                              Unit price
                            </p>
                            <p className="mt-1 text-lg font-bold text-gray-900">
                              {product?.price != null
                                ? `₹${Number(product.price).toFixed(2)}`
                                : "—"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between rounded-xl border border-amber-100 bg-[#fffaf4] p-5">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Order total
                        </p>
                        <p className="mt-2 text-3xl font-extrabold text-amber-800">
                          {order.totalAmount != null
                            ? `₹${Number(order.totalAmount).toFixed(2)}`
                            : "—"}
                        </p>

                        {order.paymentMethod && (
                          <p className="mt-3 text-sm text-gray-600">
                            Payment:{" "}
                            <span className="font-semibold capitalize text-gray-800">
                              {order.paymentMethod}
                            </span>
                          </p>
                        )}

                        {order.paymentStatus && (
                          <p className="mt-1 text-sm text-gray-600">
                            Payment status:{" "}
                            <span className="font-semibold capitalize text-gray-800">
                              {order.paymentStatus}
                            </span>
                          </p>
                        )}
                      </div>

                      {order.createdAt && (
                        <div className="mt-5 border-t border-amber-100 pt-4">
                          <p className="text-xs font-medium text-gray-500">
                            Order date
                          </p>
                          <p className="mt-1 text-sm font-semibold text-gray-800">
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="rounded-2xl border border-amber-100 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-3xl">
              🧁
            </div>
            <h2 className="mt-5 text-xl font-bold text-gray-900">
              No orders yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
              Your bakery orders will appear here after you place an order.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrder;
