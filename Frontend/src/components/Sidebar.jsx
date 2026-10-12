import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logoImage from "../assets/images/bakery-logo.png";

export default function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", path: "dashboard-home" },
    { label: "Add Product", path: "add-product" },
    { label: "Products", path: "product-table" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    navigate("/login");
  };

  return (
    <aside className="bg-gray-950 text-gray-300 w-64 min-h-screen flex flex-col justify-between p-4 border-r border-gray-800">
      <div className="space-y-6">
        <div className="px-3 py-2 text-lg font-black text-amber-500 tracking-wider font-mono">
          <img
            src={logoImage}
            alt="Bakery Brand Logo"
            className="h-16 w-auto object-contain block"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.insertAdjacentHTML(
                "afterend",
                '<span class="text-base font-extrabold text-gray-900">BrandLogo</span>',
              );
            }}
          />
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-amber-600 text-white font-bold shadow-md shadow-amber-600/10"
                    : "text-gray-400 hover:bg-gray-900 hover:text-gray-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-gray-800 pt-4">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
