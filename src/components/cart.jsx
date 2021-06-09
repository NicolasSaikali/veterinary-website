import React, { useState, useEffect } from "react";
import { globalStateContext, dispatchStateContext } from "../context";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Loader from "./loader";
import admin from "firebase-admin";
import ProductCart from "./../pages/product/product-cart";
import TopSlider from "./top_slider";
export default function Cart(props) {
  const [ctx, setctx] = [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [products, setProducts] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({});
  useEffect(() => {
    setTotal(ctx.total);
  }, [ctx.total]);
  return (
    <div className="fade-in">
      <TopSlider />
      <div className={`cart-wrap active`}>
        <div className="cart section-padding">
          <div className="d-flex flex-column container">
            <div className="color-dark py-1">
              <h1>
                <strong className="text-uppercase">cart</strong>
              </h1>
            </div>
            <div className="w-100 py-3"></div>
            <div
              className="overflow-auto custom-scroll px-1"
              style={{ maxHeight: "80vh" }}
            >
              <div className="w-100 d-flex justify-content-center"></div>
              {ctx.cart.length === 0 ? (
                <div>
                  <div>Your cart is currently empty</div>
                  <Router>
                    <Link
                      to="/#shop"
                      className="btn bg-green-dark e-text-light my-3"
                    >
                      Browse Products
                    </Link>
                  </Router>
                </div>
              ) : (
                ctx.cart.map((product, i) => (
                  <ProductCart
                    key={`cart_products_${i}`}
                    key={`ProductCart_${i}`}
                    object={product.obj}
                    count={product.count}
                  />
                ))
              )}
              <div className="w-100 py-3"></div>
              <div className="cart-total text-right w-100">
                {ctx.cart.length > 0 && (
                  <h2>
                    TOTAL :<span className="px-3"></span>
                    <span>
                      <price>{total} &nbsp;</price>L.L.
                    </span>
                  </h2>
                )}
              </div>
              <div className="w-100 py-3"></div>
              <div className="cart-controls">
                {ctx.cart.length > 0 && (
                  <div>
                    <Link
                      to={{
                        pathname: "/checkout",
                        state: {
                          total: total,
                        },
                      }}
                    >
                      <button
                        className="btn-custom text-uppercase bg-green-dark text-light border-0 p-2 w-100 w-md-custom"
                        onClick={() => {
                          setctx({ ...ctx, cartOpen: false });
                        }}
                      >
                        proceed to checkout
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        setctx({ ...ctx, cartOpen: false });
                      }}
                      className="d-block btn-custom text-uppercase bg-secondary text-light border-0 p-2 w-100 w-md-custom mt-2"
                    >
                      go back
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
