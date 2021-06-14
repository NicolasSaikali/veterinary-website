import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { globalStateContext, dispatchStateContext } from "./../context";
import Main from "./../pages/main";
import Cart from "./../components/cart";
import TopSlider from "./top_slider";
import Checkout from "./../pages/checkout";
import TrackOrder from "../pages/track_order";
import Footer from "./../components/footer";
import ProductPage from "../pages/product/page";
import ChatBox from "./chatbox";
import { user } from "firebase-functions/lib/providers/auth";
export default function Navbar(props) {
  const [ctx, setctx] = [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [mobileEngaged, setMobileEngaged] = useState(false);
  const mobile = () => {};
  const desktop = () => {};
  return (
    <React.Fragment>
      <Router>
        <div className="top-separator"></div>
        <div className="navbar-custom desktop  d-none d-lg-block">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-6 text-left">
                <img src="assets/logo.png" height="30" />
              </div>
              <div className="col-6 text-right d-flex justify-content-end">
                <Link
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      behavior: "smooth",
                    });
                    setctx({ ...ctx, navOpen: false });
                  }}
                  to="/"
                  className="ml-3"
                >
                  Home
                </Link>
                <a
                  onClick={() => {
                    setctx({ ...ctx, navOpen: false });
                  }}
                  className="ml-3"
                  href="/#blog"
                >
                  Blog
                </a>
                <Link className="ml-3" to="/track-order">
                  Track
                </Link>
                <a className="ml-3" href="/#contact">
                  Contact
                </a>
                <Link to="/cart">
                  <div className="d-inline-block">
                    <div className="cart-nav position-relative">
                      <i className="fa fa-shopping-cart text-light"></i>
                      <div className="position-absolute cart-count">
                        {ctx.cart.length}
                      </div>
                    </div>
                  </div>
                </Link>
                <div
                  className="text-light text-bold bold"
                  style={{ fontSize: 11 }}
                >
                  {ctx.user !== null ? ctx.user.displayName : ""}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`navbar-custom mobile d-block d-lg-none ${
            ctx.navOpen && "engaged"
          }`}
        >
          <div className="container">
            <div className="header">
              <div className="row justify-content-between">
                <div className="col-6 text-left">BRAND</div>
                <div className="col-3 text-right d-flex justify-content-end">
                  <div
                    className="burger"
                    onClick={() => {
                      let tmp = ctx.navOpen;
                      setctx({ ...ctx, navOpen: !tmp });
                    }}
                  >
                    <span className="top"></span>
                    <span className="mid"></span>
                    <span className="bottom"></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="expandable">
              <Link
                onClick={() => {
                  setctx({ ...ctx, navOpen: false });
                }}
                to="/"
              >
                Home
              </Link>
              <a href="/#blog">Blog</a>
              <Link
                onClick={() => {
                  setctx({ ...ctx, navOpen: false });
                }}
                to="/track-order"
              >
                Track
              </Link>
              <a href="/#contact">Contact</a>
              <Link
                onClick={() => {
                  setctx({ ...ctx, navOpen: false });
                }}
                to="/cart"
              >
                <div className="d-inline-block mx-3">
                  <div className="cart-nav position-relative">
                    CART
                    <div className="position-absolute cart-count">
                      {ctx.cart.length}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <Switch>
          <Route path="/track-order" exact component={TrackOrder} />
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/product" exact component={ProductPage} />
          <Route path="/cart" exact component={Cart} />
          <Route
            render={({ location }) =>
              ["/", "/"].includes(location.pathname) ? <Main /> : null
            }
          />
        </Switch>
      </Router>
      <ChatBox />
      <Footer />
    </React.Fragment>
  );
}
