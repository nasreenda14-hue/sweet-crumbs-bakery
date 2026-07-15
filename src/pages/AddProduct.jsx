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

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!product.name.trim()) {
      newErrors.name = "Product name is required";
    }
    if (!product.price) {
      newErrors.price = "Product Price is required";
    } else if (product.price < 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!image) {
      newErrors.image = "Please select image";
    }

    setError(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("image", image);
    const token = localStorage.getItem("token");
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/product`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/products`);
      console.log("API RESPONSE:", res.data);
      setProducts(res.data.product || res.data);
      setProduct({ name: "", price: "", description: "", image: "" });

      setImage(null);
      setError({});
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="max-w-2xl bg-white p-6 rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Add Product
      </h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2 font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product name"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-amber-500"
          />
          {error.name && (
            <p className="text-red-500 text-sm mt-1">{error.name}</p>
          )}
        </div>
        <div>
          <label className="block mb-2 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="499"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-amber-500"
          />
          {error.price && (
            <p className="text-red-500 text-sm mt-1">{error.price}</p>
          )}
        </div>
        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            rows="4"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="product description"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-amber-500"
          ></textarea>
        </div>
        <div>
          <label className="block mb-2 font-medium">Product Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            placeholder="Choose Image"
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-amber-500"
          />
          {error.image && (
            <p className="text-red-500 text-sm mt-1">{error.image}</p>
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
