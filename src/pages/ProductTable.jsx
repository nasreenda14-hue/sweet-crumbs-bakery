import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

function ProductTable() {
  const { products, setProducts } = useOutletContext();

  const [editIndex, setEditIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleEdit = (index) => {
    const selectedProduct = products[index];
    setEditFormData({
      name: selectedProduct.name,
      price: selectedProduct.price,
      description: selectedProduct.description,
      image: selectedProduct.image,
    });
    setEditIndex(index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (index) => {
    try {
      const id = products[index]._id;

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/product/${id}`,
        editFormData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const updatedProducts = products.map((item, i) =>
        i === index ? res.data.product : item,
      );

      setProducts(updatedProducts);
      setEditIndex(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  const triggerDeletePopup = (index) => {
    setDeleteIndex(index);
    setIsDeleteOpen(true);
  };

  const executeDelete = async () => {
    try {
      const id = products[deleteIndex]._id;
      console.log("DELETE ID:", id);

      await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/product/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product`);
      setProducts(res.data.products);
    } catch (err) {
      console.log("DELETE ERROR:", err.response?.data || err.message);
    }
    setIsDeleteOpen(false);
    setDeleteIndex(null);
  };
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden relative">
      <div className="mb-6 pb-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight taxt-center">
            Products
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto w-full rounded-2xl border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-amber-50/60 border-b border-gray-200 text-xs font-bold text-gray-700 uppercase tracking-wider">
              <th className="p-4 w-20 text-center">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4 hidden md:table-cell">Description</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-sm text-gray-600 bg-white">
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="p-10 text-center text-gray-400 font-light italic bg-gray-50/50"
                >
                  No items remain in your catalog registry.
                </td>
              </tr>
            ) : (
              products.map((p, index) => {
                const isEditing = editIndex === index;
                return (
                  <tr
                    key={p._id || index}
                    className="hover:bg-amber-50/25 transition-colors duration-150"
                  >
                    <td className="p-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center shadow-inner mx-auto">
                        <img
                          src={`${import.meta.env.VITE_API_URL}/${p.image.replace(/\\/g, "/")}`}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-4 font-bold text-gray-900 whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={editFormData.name}
                          onChange={handleInputChange}
                          className="bg-gray-50 border border-amber-300 text-gray-900 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 w-full"
                        />
                      ) : (
                        p.name
                      )}
                    </td>
                    <td className="p-4 font-mono font-semibold text-amber-700 text-base">
                      {isEditing ? (
                        <div className="flex items-center gap-0.5">
                          <span className="text-gray-400 text-sm font-sans">
                            ₹
                          </span>
                          <input
                            type="text"
                            name="price"
                            value={editFormData.price}
                            onChange={handleInputChange}
                            className="bg-gray-50 border border-amber-300 text-amber-700 font-mono rounded-lg px-1.5 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 w-20 font-bold"
                          />
                        </div>
                      ) : (
                        `₹${p.price}`
                      )}
                    </td>
                    <td className="p-4 text-gray-500 font-light leading-relaxed max-w-xs hidden md:table-cell">
                      {isEditing ? (
                        <input
                          type="text"
                          name="description"
                          value={editFormData.description}
                          onChange={handleInputChange}
                          className="bg-gray-50 border border-amber-300 text-gray-900 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 w-full"
                        />
                      ) : (
                        <p className="line-clamp-2" title={p.description}>
                          {p.description}
                        </p>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleSave(index)}
                            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-3 py-1.5 rounded-xl text-xs transition-colors focus:outline-none shadow-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold px-3 py-1.5 rounded-xl text-xs transition-colors focus:outline-none"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(index)}
                            className="text-amber-600 hover:text-amber-800 font-semibold px-2 py-1 rounded-md text-xs transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => triggerDeletePopup(index)}
                            className="text-red-600 hover:text-red-800 font-semibold px-2 py-1 rounded-md text-xs transition-colors"
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

      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 max-w-sm w-full shadow-2xl scale-100 transition-transform">
            <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">
              Delete Product?
            </h3>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Are you sure you want to remove{" "}
              <span className="font-bold text-gray-800">
                "{products[deleteIndex]?.name}"
              </span>
              ? This catalog action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setIsDeleteOpen(false);
                  setDeleteIndex(null);
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold px-4 py-2 rounded-xl text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors shadow-sm"
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
