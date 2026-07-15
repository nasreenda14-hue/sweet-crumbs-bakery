import React from "react";
import aboutImage from "../assets/images/background.jpg";

export default function About() {
  return (
    <section className="bg-white py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative group">
            <div className="absolute -top-4 -left-4 w-full h-full bg-amber-100 rounded-3xl -z-10 transform group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            <div className="aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-md bg-gray-50 border border-gray-100">
              <img
                src={aboutImage}
                alt="Our bakers hard at work kneading fresh dough"
                className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>

          <div className="space-y-6 lg:max-w-xl">
            <span className="inline-block bg-amber-50 text-amber-700 font-semibold text-xs tracking-wider uppercase px-3 py-1 rounded-full">
              Our Story
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Baked with Passion, <br />
              Perfected by{" "}
              <span className="text-amber-600 font-serif italic font-normal">
                Generations
              </span>
            </h2>

            <div className="w-12 h-1 bg-amber-500 rounded-full" />

            <p className="text-gray-600 text-base leading-relaxed font-light">
              Sweet Crumbs Bakery is all about bringing joy through freshly
              baked treats made with care and passion. We believe that every
              bite should be special, which is why we use high-quality
              ingredients and prepare everything fresh each day. From soft cakes
              to flaky pastries, our goal is to deliver flavors that make every
              moment sweeter.
            </p>

            <p className="text-gray-600 text-base leading-relaxed font-light">
              Our bakery focuses on simplicity, quality, and customer
              satisfaction. Whether you're looking for everyday treats or
              something special for a celebration, we offer a variety of
              options, including custom cakes made to match your taste and
              occasion. With a commitment to freshness and fast delivery, Sweet
              Crumbs Bakery is here to make your experience delightful and
              memorable.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100">
              <div>
                <h4 className="text-xl font-bold text-gray-900">
                  100% Organic
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Sourced from local grain mills
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">Fresh Daily</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Baked raw before dawn arrive
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
