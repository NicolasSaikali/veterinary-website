import React, { useState, useEffect } from "react";

export default function WhyChooseUs() {
  return (
    <div className="section-padding">
      <img
        src="assets/petfeet.png"
        alt=""
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          opacity: 0.1,
          width: "50%",
          height: "auto",
        }}
      />
      <div className="container">
        <div className="section-title">
          <h1>Why Choose Us?</h1>
        </div>
        <div className="row jsutify-content-center py-3">
          <div className="col-lg-4">
            <div className="d-block mb-3 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 24 24"
                fill="none"
                style={{ stroke: "var(--green-darker)" }}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-check-circle"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h4 className="my-1 color-dark text-center">
              BIOLOGICALLY APPROPRIATE
            </h4>
            <p className="text-center">
              We use human-grade ingredients to prepare nutritious treats for
              your dog.
            </p>
          </div>
          <div className="col-lg-4 pt-3 pt-md-0">
            <div className="d-block mb-3 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--green-darker)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-minus-circle"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </div>
            <h4 className="my-1 color-dark text-center">NO CHEMICALS</h4>
            <p className="text-center">
              We use single or minimum ingredients in our recipes with zero
              chemicals, additives, or preservatives.
            </p>
          </div>
          <div className="col-lg-4 pt-3 pt-md-0">
            <div className="d-block mb-3 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--green-darker)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-award"
              >
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
            </div>
            <h4 className="my-1 color-dark text-center">SMALL BATCH</h4>
            <p className="text-center">
              All our treats are hand made in small batches to maintain
              freshness and nutritious value.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
