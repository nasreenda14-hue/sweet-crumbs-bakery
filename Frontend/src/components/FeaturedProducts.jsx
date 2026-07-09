import React from "react";
import { Link } from "react-router-dom";
import cake from "../assets/images/products/chocolate-cake.jpg";
import croissant from "../assets/images/products/croissant.jpg";
import muffin from "../assets/images/products/blueberry-muffin.jpg";
import roll from "../assets/images/products/cinnamon-roll.jpg";

export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "Chocolate Cake",
      price: "$25",
      description:
        "Rich, moist, and layered with smooth chocolate goodness for a truly indulgent treat.",
      image: cake,
    },
    {
      id: 2,
      name: "Croissant",
      price: "$3",
      description:
        "Light, flaky, and buttery pastry with a perfectly crisp golden crust.",
      image: croissant,
    },
    {
      id: 3,
      name: "Blueberry Muffin",
      price: "$4",
      description:
        "Soft and fluffy muffin bursting with juicy blueberries in every bite.",
      image: muffin,
    },
    {
      id: 4,
      name: "Cinnamon Roll",
      price: "$5",
      description:
        "Warm, sweet roll swirled with cinnamon and topped with a creamy glaze.",
      image: roll,
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="text-amber-600 font-semibold text-xs tracking-wider uppercase bg-amber-50 px-3 py-1 rounded-full">
            Customer Favorites
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Our Best Sellers
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 ease-out"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="flex flex-col flex-1 p-5">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-amber-600 transition-colors line-clamp-1">
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
                  to="/order"
                  className="w-full bg-[#c97a28] group-hover:bg-[#a8611d] text-white group-hover:text-gray-900 font-semibold py-2.5 px-4 rounded-xl text-sm transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
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
          ))}
        </div>
      </div>
    </section>
  );
}
