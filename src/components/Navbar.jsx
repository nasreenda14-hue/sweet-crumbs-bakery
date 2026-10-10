import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logoImage from "../assets/images/bakery-logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-[#8b4513] border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <NavLink to="/" >
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
            </NavLink>
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                className="text-[#FFFDD0] hover:text-[#f59e0b] px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <NavLink
              to="/login"
              className="bg-[#f59e0b] hover:bg-[#a8611d] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm"
            >
              Login
            </NavLink>
          </div>

          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-[#f59e0b] hover:text-[#a8611d] p-2 rounded-md focus:outline-none"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden bg-gray-50 border-b border-gray-200`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              className="block text-gray-600 hover:text-[#a8611d] hover:bg-indigo-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="pt-4 pb-2 border-t border-gray-200 px-3">
            <NavLink
              to="/login"
              className="w-full bg-[#f59e0b]  hover:bg-[#a8611d]  text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm text-center"
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
