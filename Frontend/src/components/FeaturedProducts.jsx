import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FeaturedProducts({ products: initialProducts , limit = 4 }) {
  const navigate = useNavigate();

  const [products, setProducts] = useState(
    Array.isArray(initialProducts) ? initialProducts : []
  );
  const [loading, setLoading] = useState(!Array.isArray(initialProducts));
  const [error, setError] = useState("");

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://sweet-crumbs-bakery.onrender.com";

  useEffect(() => {
    if (Array.isArray(initialProducts)) {
      setProducts(initialProducts);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API_URL}/api/v1/product`
        );

        const data = response.data;

        const productList = Array.isArray(data)
          ? data
          : Array.isArray(data.products)
            ? data.products
            : Array.isArray(data.product)
              ? data.product
              : [];

        setProducts(productList);
      } catch (err) {
        console.error(
          "Fetch products error:",
          err.response?.data || err.message
        );

        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_URL, initialProducts]);

  const getImageUrl = (image) => {
    if (!image) {
      return "";
    }

    const normalizedImage = String(image)
      .replace(/\\/g, "/")
      .trim();

    if (/^https?:\/\//i.test(normalizedImage)) {
      return normalizedImage;
    }

    return `${API_URL.replace(/\/+$/, "")}/${normalizedImage.replace(
      /^\/+/,
      ""
    )}`;
  };

  const handleOrderNow = (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", {
        state: {
          from: "/order",
          product,
        },
      });

      return;
    }

    navigate("/order", {
      state: {
        product,
      },
    });
  };

  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
            Freshly Baked With Love
          </p>

          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Customer Favorites
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Discover delicious cakes and treats made especially for you.
          </p>
        </div>

        {loading && (
          <p className="py-10 text-center text-gray-600">
            Loading products...
          </p>
        )}

        {error && (
          <p className="py-6 text-center text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="py-10 text-center text-gray-600">
            No products are available right now.
          </p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(limit ?products.slice(0, limit): products).map((product) => (
              <article
                key={product._id || product.id}
                className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-56 overflow-hidden bg-amber-50">
                  {product.image ? (
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name || "Bakery product"}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      Image unavailable
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h3>

                  <p className="mt-2 min-h-12 text-sm leading-6 text-gray-600">
                    {product.description || "Freshly prepared with care."}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-xl font-bold text-amber-700">
                      ₹{Number(product.price || 0).toLocaleString("en-IN")}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleOrderNow(product)}
                      className="rounded-lg bg-amber-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;