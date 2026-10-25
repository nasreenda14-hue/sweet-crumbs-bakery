import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logoImage from "../assets/images/bakery-logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const updateUser = () => {
      try {
        setUser(JSON.parse(localStorage.getItem("user")));
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("auth-change", updateUser);
    window.addEventListener("storage", updateUser);

    return () => {
      window.removeEventListener("auth-change", updateUser);
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setIsOpen(false);

    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "My-Order", href: "/my-order" },
    { label: "Contact", href: "/contact" },
  ];
  const linkClass =

    "text-[#FFFDD0] hover:text-[#f59e0b] px-3 py-2 text-sm font-medium transition-colors duration-200";

  const handleNavigation = () => {
    setIsOpen(false);
  };

  const accountLabel = isAdmin
    ? "Admin Panel"
    : `Hi, ${user?.name || user?.email || "User"}`;

  const handleAccountClick = () => {
    setIsOpen(false);
    navigate(isAdmin ? "/dashboard" : "/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-[#8b4513]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="shrink-0">
            <NavLink to="/" onClick={handleNavigation}>
              <img
                src={logoImage}
                alt="Sweet Crumbs Bakery"
                className="block h-16 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </NavLink>
          </div>

          {/* Desktop navigation */}
          <div className="hidden items-center space-x-4 md:flex lg:space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                className={linkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop account section */}
          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <button
                  type="button"
                  onClick={handleAccountClick}
                  className="max-w-40 truncate text-sm font-semibold text-[#FFFDD0] hover:text-amber-300"
                >
                  {accountLabel}
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg bg-[#f59e0b] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#a8611d]"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="rounded-lg bg-[#f59e0b] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#a8611d]"
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen((previous) => !previous)}
              type="button"
              className="rounded-md p-2 text-[#FFFDD0] hover:text-[#f59e0b] focus:outline-none"
              aria-label={isOpen ? "Close menu" : "Open menu"}
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

      {/* Mobile menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } border-b border-gray-200 bg-[#fffaf0] md:hidden`}
      >
        <div className="space-y-1 px-3 pb-4 pt-3">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              onClick={handleNavigation}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-base font-medium transition ${
                  isActive
                    ? "bg-amber-100 text-[#8b4513]"
                    : "text-gray-700 hover:bg-amber-50 hover:text-[#8b4513]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <div className="mt-3 border-t border-amber-200 pt-4">
            {user ? (
              <div className="space-y-3 px-3">
                 <button
                  type="button"
                  onClick={handleAccountClick}
                  className="block break-words text-left font-semibold text-[#8b4513]"
                >
                  {accountLabel}
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full rounded-lg bg-[#f59e0b] px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-[#a8611d]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                onClick={handleNavigation}
                className="block w-full rounded-lg bg-[#f59e0b] px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-[#a8611d]"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
