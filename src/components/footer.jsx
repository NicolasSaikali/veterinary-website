import React, { useState, useEffect } from "react";
import { Link, Router, Switch, Route } from "react-router-dom";
import Main from "../pages/main";
export default function footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div className="row">
              <div className="col-12">
                <h1>brand</h1>
                <p className="text-light">lorem ipsum di olor sit amet</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 py-3 py-md-0">
            <ul className="p-0">
              <li className="list-unstyled mb-2">
                <a href="/" className="text-decoration-none text-light fs-5">
                  HOME
                </a>
              </li>
              <li className="list-unstyled mb-2">
                <a
                  href="/blog"
                  className="text-decoration-none text-light fs-5"
                >
                  BLOG
                </a>
              </li>
              <li className="list-unstyled mb-2">
                <a
                  href="/track-order"
                  className="text-decoration-none text-light fs-5"
                >
                  TRACK ORDER
                </a>
              </li>
              <li className="list-unstyled mb-2">
                <a
                  href="/contact"
                  className="text-decoration-none text-light fs-5"
                >
                  CONTACT
                </a>
              </li>
              <li className="list-unstyled mb-2">
                <a
                  href="/cart"
                  className="text-decoration-none text-light fs-5"
                >
                  CART
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </footer>
  );
}
