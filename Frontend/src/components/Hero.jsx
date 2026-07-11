import React from "react";
import heroImage from "../assets/images/hero-bakery.jpg";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative bg-gray- 900 text-white min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Freshly baked bread and pastries"
          className="w-full h-full object-cover transform scale-105 select-none animate-[fade-in_1s_ease-out]"
        />

        <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto min-h-screen px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block bg-amber-500/20 text-amber-400 border border-amber-500/30 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
          Freshly Baked Daily
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-sm">
          Freshly Baked <br className="hidden sm:inline" />
          <span className="text-amber-400 font-serif italic font-normal">
            Happiness
          </span>{" "}
          Every Day
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Experience the joy of delicious, handcrafted treats made with love.
          Sweet Crumbs Bakery brings you the finest flavors to brighten every
          moment.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          <Link
            to="/order"
            className="w-full sm:w-auto bg-[#c97a28] hover:bg-[#a8611d] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-gray-900/30 transition-all duration-200 transform hover:-translate-y-0.5 text-center"
          >
            Order Now
          </Link>

          <Link
            to="/view"
            className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl border-2 border-white transition-all duration-200 transform hover:-translate-y-0.5 text-center text-sm tracking-wide"
          >
            View Menu
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
