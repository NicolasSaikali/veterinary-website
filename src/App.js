import {
  globalStateContext,
  dispatchStateContext,
  GlobalStateProvider,
  defaultGlobalState,
} from "./context";
import logo from "./logo.svg";
import "./App.css";
import "./swiper.css";
import Main from "./pages/main";
import Navbar from "./components/navbar";
import React, { useState, useEffect, createContext, useContext } from "react";
import Checkout from "./pages/checkout";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TopSlider from "./components/top_slider";
let lastScrollY = 0;
function App() {
  const [ctx, setctx] = [
    useContext(globalStateContext),
    useContext(dispatchStateContext),
  ];

  useEffect(() => {
    // window.addEventListener("scroll", function () {
    //   console.log(lastScrollY, window.pageYOffset);
    //   if (lastScrollY > window.pageYOffset && window.pageYOffset > 200) {
    //     document.querySelectorAll(".navbar-custom").forEach((elt) => {
    //       elt.classList.add("sticky-top");
    //     });
    //   } else if (lastScrollY > window.pageYOffset)
    //     document.querySelectorAll(".navbar-custom").forEach((elt) => {
    //       elt.classList.remove("sticky-top");
    //     });
    //   lastScrollY = window.pageYOffset;
    // });
  }, []);

  return (
    <GlobalStateProvider value={defaultGlobalState}>
      <div className="App">
        <Navbar />
      </div>
    </GlobalStateProvider>
  );
}

export default App;
