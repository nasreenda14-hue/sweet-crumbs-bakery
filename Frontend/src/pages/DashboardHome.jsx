import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderTable from "../components/OrderTable";


function DashboardHome() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product`);
         console.log("PRODUCT API RESPONSE:", res.data);

          const productList = Array.isArray(res.data.products)
          ? res.data.products
          : Array.isArray(res.data.product)
            ? res.data.product
            : [];

        setProducts(productList);
    } catch (err) {
        console.error(
          "FETCH PRODUCTS ERROR:",
          err.response?.data || err.message
        );
        setError("Unable to load product count.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-gray-600">Welcome to Admin Panel</p>
      <div className="text-amber-700 font-bold text-1xl mt-6 uppercase ">
        <h2>Total Product Items: {" "} 
           {loading ? "Loading..." : products.length}
        </h2>
         {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>
     <OrderTable />
    </div>
  );
}

export default DashboardHome;
