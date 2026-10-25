import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`${API_URL}/api/v1/product`);
      setProducts(
        Array.isArray(res.data.products)
          ? res.data.products
          : Array.isArray(res.data.product)
            ? res.data.product
            : []
      );
    } catch (err) {
      console.error("FETCH PRODUCTS ERROR:", err.response?.data || err.message);
      setError("Unable to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleEdit = (index) => {
    const product = products[index];
    setEditFormData({
      name: product.name || "",
      price: product.price ?? "",
      description: product.description || "",
    });
    setEditIndex(index);
  };

  const handleInputChange = (e) => {
    setEditFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (index) => {
    try {
      const product = products[index];

      const res = await axios.put(
        `${API_URL}/api/v1/product/${product._id}`,
        {
          ...editFormData,
          price: Number(editFormData.price),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const updatedProduct = res.data.product || {
        ...product,
        ...editFormData,
        price: Number(editFormData.price),
      };

      setProducts((prev) =>
        prev.map((item) =>
          item._id === product._id ? updatedProduct : item
        )
      );
      setEditIndex(null);
    } catch (err) {
      console.error("UPDATE PRODUCT ERROR:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Unable to update product.");
    }
  };

  const executeDelete = async () => {
    const product = products[deleteIndex];
    if (!product) return;

    try {
      await axios.delete(`${API_URL}/api/v1/product/${product._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setProducts((prev) =>
        prev.filter((item) => item._id !== product._id)
      );
    } catch (err) {
      console.error("DELETE PRODUCT ERROR:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Unable to delete product.");
    } finally {
      setIsDeleteOpen(false);
      setDeleteIndex(null);
    }
  };

  return (
    <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900">Products</h2>
          <p className="mt-1 text-sm text-gray-500">
            Total products: {products.length}
          </p>
        </div>

        <button
          type="button"
          onClick={fetchProducts}
          className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
        >
          Refresh
        </button>
      </div>

      {error && (
        <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {loading ? (
        <p className="py-10 text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full min-w-[700px] border-collapse text-left">
            <thead>
              <tr className="border-b bg-amber-50/60 text-xs uppercase text-gray-700">
                <th className="p-4 text-center">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Description</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-gray-400">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product, index) => {
                  const isEditing = editIndex === index;
                  
const imageUrl = product.image
  ? product.image.startsWith("http")
    ? product.image
    : `${API_URL}/uploads/${product.image
        .replace(/\\/g, "/")
        .split("/")
        .pop()}`
  : "";


                  return (
                    <tr key={product._id} className="hover:bg-amber-50/25">
                      <td className="p-4">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border bg-gray-50">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-xs">No image</span>
                          )}
                        </div>
                      </td>

                      <td className="p-4 font-bold text-gray-900">
                        {isEditing ? (
                          <input
                            name="name"
                            value={editFormData.name}
                            onChange={handleInputChange}
                            className="w-full rounded border p-2"
                          />
                        ) : (
                          product.name
                        )}
                      </td>

                      <td className="p-4 font-semibold text-amber-700">
                        {isEditing ? (
                          <input
                            name="price"
                            type="number"
                            min="0"
                            value={editFormData.price}
                            onChange={handleInputChange}
                            className="w-24 rounded border p-2"
                          />
                        ) : (
                          `₹${product.price}`
                        )}
                      </td>

                      <td className="max-w-xs p-4">
                        {isEditing ? (
                          <input
                            name="description"
                            value={editFormData.description}
                            onChange={handleInputChange}
                            className="w-full rounded border p-2"
                          />
                        ) : (
                          product.description || "—"
                        )}
                      </td>

                      <td className="space-x-2 whitespace-nowrap p-4 text-right">
                        {isEditing ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleSave(index)}
                              className="rounded-lg bg-amber-600 px-3 py-2 text-xs font-semibold text-white"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditIndex(null)}
                              className="rounded-lg bg-gray-100 px-3 py-2 text-xs"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => handleEdit(index)}
                              className="px-2 py-1 text-xs font-semibold text-amber-700"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setDeleteIndex(index);
                                setIsDeleteOpen(true);
                              }}
                              className="px-2 py-1 text-xs font-semibold text-red-600"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900">Delete product?</h3>
            <p className="mt-2 text-sm text-gray-600">
              Delete "{products[deleteIndex]?.name}"? This cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteOpen(false);
                  setDeleteIndex(null);
                }}
                className="rounded-lg bg-gray-100 px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductTable;
