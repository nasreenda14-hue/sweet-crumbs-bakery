import React from "react";

export default function WhyChooseUs() {
  const coreFeatures = [
    {
      id: 1,
      title: "Fresh Ingredients",
      description:
        "We source only premium organic flour, seasonal local fruits, and grass-fed butter. Zero artificial preservatives.",
      icon: (
        <svg
          className="w-6 h-6 text-amber-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c-1.2 2-1.2 4.5 0 6.5 1.2-2 1.2-4.5 0-6.5zM12 9c-1.2 2-1.2 4.5 0 6.5 1.2-2 1.2-4.5 0-6.5zM12 15c-1.2 2-1.2 4.5 0 6.5 1.2-2 1.2-4.5 0-6.5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 6c-1 1.5-1 3.5 0 5 1-1.5 1-3.5 0-5zM16 6c1 1.5 1 3.5 0 5-1-1.5-1-3.5 0-5zM8 12c-1 1.5-1 3.5 0 5 1-1.5 1-3.5 0-5zM16 12c1 1.5 1 3.5 0 5-1-1.5-1-3.5 0-5z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Handmade Daily",
      description:
        "Our bakers arrive before dawn to hand-roll croissants and knead dough, ensuring peak warmth and crispiness.",
      icon: (
        <svg
          className="w-6 h-6 text-amber-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2 12h3m14 0h3"
          />
          <rect
            x="5"
            y="9"
            width="14"
            height="6"
            rx="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Custom Cakes",
      description:
        "From elegant weddings to playful birthdays, we craft custom, show-stopping cake designs tailored to your flavor dreams.",
      icon: (
        <svg
          className="w-6 h-6 text-amber-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2v2M12 4c.3 0 .5-.2.5-.5s-.2-.5-.5-.5-.5.2-.5.5.2.5.5.5z"
          />
          <rect x="7" y="7" width="10" height="5" rx="1" />
          <rect x="4" y="12" width="16" height="7" rx="1" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 19h16" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Fast Delivery",
      description:
        "Carefully packaged and brought straight to your doorstep within your chosen window, guaranteed fresh and intact.",
      icon: (
        <svg
          className="w-6 h-6 text-amber-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 18h14M5 14h14M12 6a6 6 0 00-6 6h12a6 6 0 00-6-6zM12 3v3"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2 10h2M2 14h1"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-amber-50/50 py-16 sm:py-24 border-t border-b border-amber-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-amber-700 font-semibold text-xs tracking-wider uppercase bg-amber-100 px-3 py-1 rounded-full">
            Our Promise
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Why Choose Us
          </h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
            Fresh ingredients, exceptional taste, and baked with care —
            delivering quality you can trust in every bite.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreFeatures.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-5 shadow-inner">
                {item.icon}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2.5">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
