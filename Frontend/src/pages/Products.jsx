import React, { useEffect, useState } from "react";
import FeaturedProducts from "../components/FeaturedProducts";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) => {
    if (!search) return true;

    return product.name?.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/product`)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="flex justify-center mb-6 mt-4">
        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl px-5 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yello-400 mt-1 ml-3"
        />
      </div>

      <FeaturedProducts title="Our Products" products={filteredProducts} />
    </div>
  );
}

export default Products;
