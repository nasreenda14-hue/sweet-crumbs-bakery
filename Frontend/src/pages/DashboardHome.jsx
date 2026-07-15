import React, { useEffect, useState } from "react";
import axios from "axios";

function DashboardHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("https://sweet-crumbs-bakery.onrender.com/api/v1/product");
      setProducts(res.data.products);
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Dashboard</h1>
      <p className="mt-2 text-gray-600">Welcome to Admin Panel</p>
      <div className=" text-amber-700 font-bold text-1xl mt-6 uppercase ">
        <h2>Total Product Items: {products.length} </h2>
      </div>
    </div>
  );
}

export default DashboardHome;
