import React from "react";

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Sarah Jenkins",
      rating: 5,
      comment:
        "Absolutely loved the taste! Everything was fresh and beautifully made. Highly recommend Sweet Crumbs Bakery.",
      initials: "SJ",
    },
    {
      id: 2,
      name: "Michael Chang",
      rating: 5,
      comment:
        "The custom cake was perfect for my celebration. It looked amazing and tasted even better!",
      initials: "MC",
    },
    {
      id: 3,
      name: "Elena Rostova",
      rating: 5,
      comment:
        "Fast delivery and delicious treats. The croissants are my favorite — fresh and buttery every time!",
      initials: "ER",
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-amber-600 font-semibold text-xs tracking-wider uppercase bg-amber-50 px-3 py-1 rounded-full">
            Reviews
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            What Our Customers Say
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="relative flex flex-col justify-between bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="absolute top-6 right-8 text-gray-200 pointer-events-none select-none">
                <svg
                  className="w-10 h-10 transform rotate-180"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <div>
                <div className="flex items-center space-x-1 mb-5">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-amber-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 font-light italic relative z-10">
                  "{review.comment}"
                </p>
              </div>

              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200/60 mt-auto">
                <div className="w-11 h-11 bg-[#c97a28] text-white font-bold text-sm rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                  {review.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 tracking-wide">
                    {review.name}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
