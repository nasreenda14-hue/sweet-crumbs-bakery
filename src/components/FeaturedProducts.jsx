import React from "react";
import { Link } from "react-router-dom";

export default function FeaturedProducts({ title, products = [], limit }) {
  const safeProducts = Array.isArray(products) ? products : [];

  const displayedProducts = limit ? safeProducts.slice(0, limit) : safeProducts;

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="text-amber-600 font-semibold text-xs tracking-wider uppercase bg-amber-50 px-3 py-1 rounded-full">
            Customer Favorites
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedProducts.length == 0 ? (
            <p className="text-center col-span-4 text-gray-500">
              No products added yet
            </p>
          ) : (
            displayedProducts.map((product) => (
              <div
                key={product._id}
                className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
                  <img
                    src={`https://sweet-crumbs-bakery.onrender.com/${product.image.replace(/\\/g, "/")}`}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 ease-out"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-amber-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <span className="text-[#c97a28] font-extrabold text-base whitespace-nowrap bg-amber-50 px-2.5 py-0.5 rounded-lg">
                      {product.price}
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {product.description}
                  </p>

                  <Link
  to="/contact"
  state={{ product: product.name }}

                    
                    className="w-full bg-[#c97a28] group-hover:bg-[#a8611d] text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Order Now</span>
                    <svg
                      className="w-4 h-4 transform translate-x-0 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
