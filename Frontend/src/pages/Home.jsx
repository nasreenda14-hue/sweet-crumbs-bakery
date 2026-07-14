import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonial";
import CallToAction from "../components/CallToAction";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/product")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Hero />
      <FeaturedProducts title="Best Sellers" products={products} limit={4} />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </div>
  );
}

export default Home;
