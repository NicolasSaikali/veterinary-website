import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export default function TopSlider() {
  const [slides, setSlides] = useState([]);
  let tmp = [
    {
      title: "Title here",
      text: "lorem ipsum di olor sit amet",
      button_text: "Read More",
      image: "https://picsum.photos/1920/1080",
    },
    {
      title: "Title here",
      text: "lorem ipsum di olor sit amet",
      button_text: "Read More",
      image: "https://picsum.photos/1920/1081",
    },
    {
      title: "Title here",
      text: "lorem ipsum di olor sit amet",
      button_text: "Read More",
      image: "https://picsum.photos/1920/1082",
    },
  ];
  useEffect(() => {
    setSlides(tmp);
  }, []);
  return (
    <div className="w-100">
      <Swiper centeredSlides={false} spaceBetween={0} slidesPerView={1}>
        {slides.map((slide, i) => (
          <SwiperSlide key={`slides_top_${i}`} className="h-100">
            <div className="w-100 h-100">
              <img
                src={slide.image}
                alt=""
                className="swiper-image position-absolute top-0 left-0 w-100"
                style={{ zIndex: 5, height: 600, objectFit: "cover" }}
              />
              <div
                className="swiper-content w-100 position-relative d-flex align-items-center"
                style={{
                  height: 600,
                  zIndex: 10,
                }}
              >
                <div className="container text-light">
                  <h1 className="text-light">{slide.title}</h1>
                  <p className="pb-3">{slide.text}</p>
                  <a href="" className="swiper-redirection">
                    READ MORE
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
