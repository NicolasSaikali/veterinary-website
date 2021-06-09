import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "./../../components/loader";
import { globalStateContext, dispatchStateContext } from "././../../context";
import BlogSlide from "./blogSlide";

export default function BlogSection(props) {
  const [ctx, setctx] = [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [BlogLoaded, setBlogLoaded] = useState(false);
  const [blog, setBlog] = useState([]);
  const [imageURL, setImageURL] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);
  const [captionExtended, setCaptionExtended] = useState(false);
  useEffect(() => {
    let tmp = [];
    ctx.firestore.collection("blog_posts").onSnapshot((response) => {
      setBlogLoaded(true);
      setBlog([]);
      response.forEach((post) => {
        tmp.push(post);
      });
      setBlog(tmp);
    });
  }, []);
  return (
    <div
      className={`w-100 p-0 Blog section-padding ${
        !BlogLoaded && "text-center"
      }`}
      id="blog"
    >
      <div className="section-title">
        <h1>Our Blog</h1>
      </div>
      {BlogLoaded ? (
        <Swiper spaceBetween={0} slidesPerView={1}>
          {blog.map((product, i) => (
            <SwiperSlide key={`slides_Blog_${i}`}>
              <BlogSlide object={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Loader />
      )}
    </div>
  );
}
