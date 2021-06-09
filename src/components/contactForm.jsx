import React, { useState, useEffect, useContext } from "react";
import { globalStateContext, dispatchStateContext } from "././../context";

export default function ContactForm(props) {
  const [ctx, setctx] = [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  return (
    <div className="section-padding overflow-hidden">
      <img
        src="assets/petfeet2.png"
        alt=""
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          opacity: 0.1,
          width: "20%",
          height: "auto",
        }}
      />
      <div className="container">
        <div className="section-title">
          <h1>Contact Us</h1>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-6">
            <input
              type="text"
              className="text-fields mb-3"
              placeholder="Full Name"
            />
            <input
              type="email"
              className="text-fields mb-3"
              placeholder="Email"
            />
            <textarea
              rows={7}
              className="text-fields mb-3"
              placeholder="Message..."
            ></textarea>
            <div className="d-flex w-100 justify-content-end">
              <button class="p-3 border-0 text-light bg-green-dark px-5">
                SEND
              </button>
            </div>
          </div>
          <div className="col-lg-6 pt-3 pt-md-0">
            <div class="mapouter">
              <div class="gmap_canvas">
                <iframe
                  style={{ borderRadius: 20 }}
                  width="600"
                  height="500"
                  style={{ maxWidth: "100%" }}
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?q=Amchit&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
