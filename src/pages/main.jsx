import React, { useState, useEffect } from "react";
import ProductsSection from "./product/product_section";
import { globalStateContext, dispatchStateContext } from "./../context";
import TopSlider from "./../components/top_slider";
import BlogSection from "./blog/blog_section";
export default function Main() {
  const [ctx, setctx] = [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  return (
    <div className="main fade-in">
      <TopSlider />
      <ProductsSection />
      <BlogSection />
    </div>
  );
}
