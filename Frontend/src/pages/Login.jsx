import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    try {
      const res = await axios.post("https://sweet-crumbs-bakery.onrender.com/api/v1/login", {
        email,
        password,
      });

      (localStorage.setItem("token", res.data.token),
        localStorage.setItem("user", JSON.stringify(res.data.user)));
      console.log(res.data);
      navigate("/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Login failed",
      );
    }
  };

  return (
    <section className="bg-amber-50/30 min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white border border-gray-150 rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#c97a28]" />

        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-500 font-light">
            Sign in to manage your orders and view sweet fresh rewards
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-bold text-gray-700 uppercase tracking-wider"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={credentials.email}
              onChange={handleChange}
              placeholder="baker@example.com"
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs font-bold text-gray-700 uppercase tracking-wider"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={credentials.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-200"
            />
          </div>

          <div className="flex items-center justify-between text-sm pt-1">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                name="rememberMe"
                checked={credentials.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 rounded text-amber-600 border-gray-300 focus:ring-amber-500 cursor-pointer accent-amber-600"
              />
              <span>Remember me</span>
            </label>
            <a
              href="#"
              className="text-[#c97a28] hover:text-[#a8611d] font-semibold transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#c97a28] hover:bg-[#a8611d] text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-amber-600/20 transform hover:-translate-y-0.5 text-center tracking-wide"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500 font-light">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-[#c97a28] hover:text-[#a8611d] font-bold transition-colors"
          >
            Sign up now
          </a>
        </p>
      </div>
    </section>
  );
}
