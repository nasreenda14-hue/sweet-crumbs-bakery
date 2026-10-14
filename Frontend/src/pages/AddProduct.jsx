import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

function AddProduct() {
  const { products, setProducts } = useOutletContext();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const [image, setImage] = useState(null);
  const [error, setError] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const newErrors = {};

    if (!product.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (product.price === "" || Number(product.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!image) {
      newErrors.image = "Please select an image";
    } else if (!image.type.startsWith("image/")) {
      newErrors.image = "Please select a valid image file";
    }

    setError(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please log in as an admin before adding a product.");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name.trim());
    formData.append("price", String(Number(product.price)));
    formData.append("description", product.description.trim());
    formData.append("image", image);

    setLoading(true);

    try {
      // Create the product
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/product`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("PRODUCT CREATED:", response.data);

      // Refresh the product list using the correct endpoint
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product`
      );

      const updatedProducts = res.data.products || [];
      setProducts(updatedProducts);

      setProduct({
        name: "",
        price: "",
        description: "",
        image: "",
      });

      setImage(null);
      setError({});
      setMessage("Product added successfully!");

      // Clear the file input after successful submission
      const fileInput = document.getElementById("product-image");
      if (fileInput) fileInput.value = "";
    } catch (err) {
      console.error(
        "ADD PRODUCT ERROR:",
        err.response?.data || err.message
      );

      setMessage(
        err.response?.data?.message ||
          "Failed to add product. Please check the backend logs."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mt-8 rounded-xl bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
        Add Product
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product name"
            className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-amber-500"
          />
          {error.name && (
            <p className="mt-1 text-sm text-red-500">{error.name}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">Price</label>
          <input
            type="number"
            name="price"
            min="0.01"
            step="0.01"
            value={product.price}
            onChange={handleChange}
            placeholder="499"
            className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-amber-500"
          />
          {error.price && (
            <p className="mt-1 text-sm text-red-500">{error.price}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">Description</label>
          <textarea
            rows="4"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Product description"
            className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Product Image</label>
          <input
            id="product-image"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-amber-500"
          />
          {error.image && (
            <p className="mt-1 text-sm text-red-500">{error.image}</p>
          )}
        </div>

        {message && (
          <p
            role="status"
            className={`text-sm ${
              message === "Product added successfully!"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-amber-600 px-6 py-2 font-semibold text-white hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
