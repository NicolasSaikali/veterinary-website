import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductGrid from "./grid";
import Loader from "./../../components/loader";
import { globalStateContext, dispatchStateContext } from "././../../context";

export default function ProductsSection(props) {
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [ctx, setctx] = [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  useEffect(() => {
    ctx.firestore.collection("products").onSnapshot((response) => {
      let tmp = [];
      response.forEach((product) => {
        tmp.push(product);
      });
      setProductsLoaded(true);
      setProducts(tmp);
    });
  }, []);
  const addToCart = (id) => {
    let tmp = ctx.cart;
    if (tmp === null) return;
    tmp.push(id);
    setctx({ ...ctx, cart: tmp });
    console.log(ctx.cart);
  };

  const removeFromCart = (id) => {
    let tmp = ctx.cart;
    console.log("cart", tmp, tmp.length);
    if (tmp === null) return;
    tmp.splice(
      tmp.findIndex((x) => x.id === id),
      1
    );
    setctx({ ...ctx, cart: tmp });
  };
  return (
    <div
      className={`container section-padding py-4 ${
        !productsLoaded && "text-center"
      }`}
      style={{
        backgroundImage: `url("./assets/shopping-bag.png")`,
      }}
    >
      <img
        src="assets/petfeet.png"
        alt=""
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          opacity: 0.1,
          width: "50%",
          height: "auto",
          transform: "rotate(180deg) translate(50%,-20%)",
        }}
      />
      <div className="section-title">
        <h1>Our Products</h1>
      </div>
      {productsLoaded ? (
        <Swiper
          centeredSlides={true}
          breakpoints={{
            // when window width is >= 640px
            0: {
              centeredSlides: true,
              width: 250,
              slidesPerView: 1,
            },
            // when window width is >= 768px
            574: {
              centeredSlides: false,

              slidesPerView: 2,
            },
            800: {
              centeredSlides: false,

              slidesPerView: 3,
            },
          }}
          spaceBetween={50}
          slidesPerView={3}
        >
          {products.map((product, i) => (
            <SwiperSlide key={`slides_products_${i}`}>
              <ProductGrid product={product} />
              <div className="swiper-pagination"></div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Loader />
      )}
    </div>
  );
}
