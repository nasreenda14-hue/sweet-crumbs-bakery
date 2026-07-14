import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/product")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Outlet context={{ products, setProducts }} />
      </div>
    </div>
  );
}

export default Dashboard;
