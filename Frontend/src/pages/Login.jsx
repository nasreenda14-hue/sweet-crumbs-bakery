import React, { useState } from "react";
import apiClient from "../api/axios";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setCredentials((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const email = credentials.email.trim().toLowerCase();
    const password = credentials.password;

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await apiClient.post(
        "/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      const data = response.data;

      if (!data.token || !data.user) {
        setError("Login failed. The server did not return your account.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update the navbar's account information.
      window.dispatchEvent(new Event("auth-change"));

      // Return to the product the customer originally selected.
      if (
        location.state?.from === "/order" &&
        location.state?.product
      ) {
        navigate("/order", {
          state: {
            product: location.state.product,
          },
          replace: true,
        });

       
      }

      // Send admins to their dashboard after login.
      else if (data.user.role === "admin") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error(
        "Login error:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
          "Unable to log in. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-amber-800">
            Sweet Crumbs
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Welcome back! Sign in to continue.
          </p>
        </div>

        {location.state?.from === "/order" &&
          location.state?.product && (
            <div className="mb-5 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
              Please log in to order{" "}
              <strong>{location.state.product.name}</strong>.
            </div>
          )}

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              name="rememberMe"
              checked={credentials.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 accent-amber-700"
            />
            Remember me
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-amber-700 px-4 py-3 font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="font-semibold text-amber-700 hover:text-amber-900"
          >
            Register
          </button>
        </p>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-4 w-full text-center text-sm text-gray-500 hover:text-amber-800"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Login;