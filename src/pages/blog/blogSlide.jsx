import React, { useState, useEffect, useContext } from "react";
import { globalStateContext, dispatchStateContext } from "././../../context";
import "firebase/storage";
export default function BlogSlide(props) {
  const [ctx, setctx] = [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [image, setImage] = useState("");

  useEffect(() => {
    ctx.firebase
      .storage()
      .ref("/" + props.object.data().media[0].split("/")[0])
      .child(props.object.data().media[0].split("/")[1])
      .getDownloadURL()
      .then((url) => {
        setImage(url);
      });
  }, []);
  return (
    <div class="w-100 position-relative blog-single" style={{ height: 800 }}>
      <img src={image} alt="" className="blog-image-bg" />
      <div className="blog-image-wrapper">
        <img src={image} alt="" className="blog-image w-100 h-100" />
        <div className="blog-caption">{props.object.data().caption}</div>
      </div>
      <div className="overlay"></div>
    </div>
  );
}
