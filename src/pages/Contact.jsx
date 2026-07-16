import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function ContactSection() {
 const routerLocation = useLocation();

const selectedProduct = routerLocation.state?.product || "";
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    product: "",
    quantity:"",
    message: "",
  });
  useEffect(() => {
  if (selectedProduct) {
    setFormData((prev) => ({
      ...prev,
      product: selectedProduct,
    }));
  }
}, [selectedProduct]);


  const location1 = "123 Maple Street Springfield IL 62701 USA";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/orders`, formData)
    console.log(response.data);
    alert("Order Submitted successfully");
    setFormData({ name: "", phone: "", product: "",quantity:"", message: "" });}
    catch(error){
      console.log("ERROR:", error.response?.data || error.message);
      alert("Something went wrong")
    }
  };

  return (
    <section className="bg-amber-50/20 py-16 sm:py-24 border-t border-gray-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="text-center max-w-xl mx-auto mb-16">
  <span className="text-amber-700 font-semibold text-xs tracking-wider uppercase bg-amber-100 px-3 py-1 rounded-full">
    Place Your Order
  </span>

  <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
    Order Fresh from Our Bakery
  </h2>

  <p className="mt-4 text-gray-600 text-sm sm:text-base font-light leading-relaxed">
    Craving something sweet? Place your order for freshly baked cakes, pastries, and treats. Fill out the form below and we’ll prepare your order with care.
  </p>
</div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-start">
          <div className="lg:col-span-1 space-y-8 bg-gray-900 text-white rounded-3xl p-8 shadow-xl">
            <div>
              <h3 className="text-xl font-bold tracking-tight mb-2">
                Bakery Headquarters
              </h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                Stop by to catch the early aroma of fresh breads straight out of
                our hot brick ovens.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 flex-shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <a
                  href={`https://www.google.com/maps?q=${encodeURIComponent(location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 mt-1 leading-relaxed hover:text-amber-400 transition-colors"
                >
                  📍 {location1}
                </a>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 flex-shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-200">
                    Call or Email
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    <a
                      href="tel:+1(555)123-4567"
                      className="hover:text-amber-400 transition-colors"
                    >
                      +1 (555) 123-4567
                    </a>
</p>
                    <p className="text-xs text-gray-400 mt-1">
                      <a
                        href="https://wa.me/15551234567"
                        target="_blank"
                        className="hover:text-amber-400"
                      >
                        Chat on WhatsApp
                      </a>
                    
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@sweetcrumbsbakery.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber-400 transition-colors"
                    >
                      hello@sweetcrumbsbakery.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 flex-shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-200">
                    Bakery Timing
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Mon - Fri: 6:00 AM - 6:00 PM
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Sat - Sun: 7:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-xs font-bold text-gray-700 uppercase tracking-wider"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-200"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="text-xs font-bold text-gray-700 uppercase tracking-wider"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your number"
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="product"
                  className="text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Product
                </label>
                <input
                  type="text"
                  id="product"
                  name="product"
                  required
                  value={formData.product}
                  onChange={handleChange}
                  placeholder="Enter Product you want"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-200"
                />
              </div>
             <div className="flex flex-col gap-2">
  <label
    htmlFor="quantity"
    className="text-xs font-bold text-gray-700 uppercase tracking-wider"
  >
    Quantity
  </label>

  <input
    type="number"
    id="quantity"
    name="quantity"
    required
    value={formData.quantity}
    onChange={handleChange}
    placeholder="Enter quantity"
    min="1"
    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-200"
  />
</div>
              

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us details about your event, delivery date requirements, or custom flavor concepts..."
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-200 resize-none leading-relaxed"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#c97a28] hover:bg-[#a8611d] text-white font-semibold px-8 py-3.5 rounded-xl shadow-md hover:shadow-amber-600/20 transition-all duration-200 transform hover:-translate-y-0.5 text-center text-sm tracking-wide"
                >
                  Submit  
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
