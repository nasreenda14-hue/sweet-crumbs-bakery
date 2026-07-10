import React from "react";
import FeaturedProducts from "../components/FeaturedProducts";

function Products() {
  let title = "Our Products";
  return (
    <div>
      <FeaturedProducts title={title} />
    </div>
  );
}

export default Products;
