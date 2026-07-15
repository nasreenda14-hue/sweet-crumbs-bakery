import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import AddProduct from "./pages/AddProduct";
import ProductTable from "./pages/ProductTable";
import DashboardHome from "./pages/DashboardHome";
import AdminRoute from "./routes/AdminRoute";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/product`)
      .then((res) => {
        console.log("API DATA:", res.data);
        setProducts(res.data.product); 
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/products" element={<Products products={products} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        >
          <Route path="dashboard-home" element={<DashboardHome />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="product-table" element={<ProductTable />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
