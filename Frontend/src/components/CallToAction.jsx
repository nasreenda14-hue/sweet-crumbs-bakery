import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/images/background/background.jpg";

export default function CallToAction() {
  return (
    <section className="relative py-20 sm:py-28 bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Freshly baked artisan goods"
          className="w-full h-full object-cover transform scale-100 select-none"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />
      </div>

      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none select-none">
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-white rounded-full filter blur-xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white rounded-full filter blur-2xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-1.5 bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm animate-pulse">
          <svg
            className="w-3.5 h-3.5 text-amber-200"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
              clipRule="evenodd"
            />
          </svg>
          Limited Time Offer
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
          Ready to Enjoy Fresh Bakery Treats?
        </h2>

        <p className="text-amber-50 text-base sm:text-lg max-w-2xl mx-auto mb-8 font-light leading-relaxed">
          Treat yourself to something sweet today. Explore our freshly baked
          delights and place your order now for a taste you’ll love..
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/order"
            className="w-full sm:w-auto bg-[#c97a28] hover:bg-[#a8611d] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-gray-900/30 transition-all duration-200 transform hover:-translate-y-0.5 text-center text-sm tracking-wide"
          >
            Order Online Now
          </Link>

          <Link
            to="/map"
            className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl border-2 border-white transition-all duration-200 transform hover:-translate-y-0.5 text-center text-sm tracking-wide"
          >
            Find Our Shop
          </Link>
        </div>

        <p className="text-xs text-amber-200 mt-4 italic font-medium">
          * Freshness 100% guaranteed. Hand-kneaded daily before dawn.
        </p>
      </div>
    </section>
  );
}
