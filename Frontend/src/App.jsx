import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import apiClient from "./api/axios";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Layout from "./components/Layout";
import AddProduct from "./pages/AddProduct";
import ProductTable from "./pages/ProductTable";
import DashboardHome from "./pages/DashboardHome";

import AdminRoute from "./routes/AdminRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

import Order from "./pages/Order";
import Chatbot from "./components/Chatbot";
import MyOrder from "./components/MyOrder";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get("/api/v1/product");

        const data = response.data;

        const productList = Array.isArray(data.product)
          ? data.product
          : Array.isArray(data.products)
            ? data.products
            : Array.isArray(data)
              ? data
              : [];

        setProducts(productList);
      } catch (error) {
        console.error(
          "Unable to fetch products:",
          error.response?.data || error.message
        );
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Routes>
        {/* Public website pages */}
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<Home products={products} />}
          />

          <Route
            path="/products"
            element={<Products products={products} />}
          />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Login required to place an order */}
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />

          {/* Login required to access personal orders */}
          <Route
            path="/my-order"
            element={
              <ProtectedRoute>
                <MyOrder />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Admin dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Navigate to="dashboard-home" replace />}
          />

          <Route
            path="dashboard-home"
            element={<DashboardHome />}
          />

          <Route
            path="add-product"
            element={<AddProduct />}
          />

          <Route
            path="product-table"
            element={<ProductTable />}
          />
        </Route>

        {/* Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Unknown URL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Chatbot />
    </div>
  );
}

export default App;
