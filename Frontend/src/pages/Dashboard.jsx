import React, { useState } from 'react'
import Sidebar from "../components/Sidebar";
import { Outlet } from 'react-router-dom';

function Dashboard() {
  const [products, setProducts] = useState([]);
  return (
    <div className="flex min-h-screen bg-gray-100">
<Sidebar />
<main className="min-w-0 flex-1 p-4 sm:p-6">
    <Outlet context={{ products, setProducts }} />
  </main>
</div>
  )
}

export default Dashboard
