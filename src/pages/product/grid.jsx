import React, { useState, useEffect } from "react";
import { globalStateContext, dispatchStateContext } from "./../../context";
import { Link } from "react-router-dom";
export default function ProductGrid(props) {
  const [ctx, setctx] = [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [imageURL, setImageURL] = useState(null);
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    if (props.product.data().images.length === 0) return;
    ctx.firebase
      .storage()
      .ref("/" + props.product.data().images[0].split("/")[0])
      .child(props.product.data().images[0].split("/")[1])
      .getDownloadURL()
      .then((url) => {
        setImageURL(url);
      });
  });
  useEffect(() => {
    if (ctx.cart.findIndex((x) => x.obj.id === props.product.id) !== -1)
      setSelected(true);
    else setSelected(false);
  }, [ctx.cart.length]);
  return (
    <div className="product-grid">
      <div className={`position-absolute product-content`}>
        <img
          src={imageURL}
          alt=""
          className={`product-image ${
            props.product.data().stock_no == 0 && "grayscale"
          }`}
        />
        <div className="product-info">
          <div className="d-flex justify-content-between align-items-center px-2">
            <div className="d-inline p-2">
              <div className="product-name">{props.product.data().name}</div>
              <div className="text-secondary d-block">
                {props.product.data().price} L.L.
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <Link
                to={{
                  pathname: `/product`,
                  state: {
                    id: props.product.id,
                  },
                }}
              >
                <div className="fa fa-eye color-dark"></div>
              </Link>
              {props.product.data().stock_no > 0 ? (
                selected ? (
                  <i
                    className="fa fa-trash-o text-danger fs-5"
                    onClick={() => {
                      let tmp = ctx.cart;
                      if (tmp === undefined) return;
                      tmp.splice(
                        tmp.findIndex((x) => x.obj.id === props.product.id),
                        1
                      );
                      setctx({ ...ctx, cart: tmp.length === 0 ? [] : tmp });
                    }}
                  ></i>
                ) : (
                  <i
                    className="fa fa-cart-plus color-dark fs-5"
                    onClick={() => {
                      let cart = ctx.cart;
                      // if (cart.findIndex((x) => x.id === props.product.id) !== -1)
                      //   return;
                      cart.push({ obj: props.product, count: 1 });
                      setctx({ ...ctx, cart });
                    }}
                  ></i>
                )
              ) : (
                <small className="text-secondary" style={{ fontSize: 11 }}>
                  OUT OF STOCK
                </small>
              )}
            </div>
          </div>
          <div className="product-details px-3">
            <div className="description custom-scroll mb-2">
              {props.product.data().description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
