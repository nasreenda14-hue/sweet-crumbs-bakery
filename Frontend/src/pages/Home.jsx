import React from "react";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonial";
import CallToAction from "../components/CallToAction";

function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </div>
  );
}

export default Home;
