import React, { useState, useEffect } from "react";
import { globalStateContext, dispatchStateContext } from "./../../context";

export default function ProductGrid(props) {
  const [ctx, setctx] = [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    if (ctx.cart.findIndex((x) => x.obj.id === props.product.id) !== -1)
      setSelected(true);
    else setSelected(false);
  }, [ctx.cart.length]);
  return (
    <div className="product-grid">
      <div className="position-absolute product-content">
        <img
          src="https://picsum.photos/600/600"
          alt=""
          className="product-image"
        />
        <div className="product-info">
          <div className="d-flex justify-content-between align-items-center px-2">
            <div className="d-inline p-2">
              <div className="product-name">{props.product.data().name}</div>
              <div className="text-secondary d-block">
                {props.product.data().price} L.L.
              </div>
            </div>
            <div className="d-flex justify-content-between">
              {selected ? (
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
