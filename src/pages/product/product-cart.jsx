import React, { useState, useEffect } from "react";
import { globalStateContext, dispatchStateContext } from "./../../context";

export default function ProductCart(props) {
  const [ctx, setctx] = [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [count, setCount] = useState(1);
  useEffect(() => {
    setCount(props.count);
  }, []);
  useEffect(() => {
    let updateTrigger = ctx.countUpdate;
    let tmp = ctx.cart;
    if (tmp === undefined) return;
    tmp[tmp.findIndex((x) => x.obj.id === props.object.id)].count = count;
    setctx({ ...ctx, cart: tmp });
    setctx({ ...ctx, countUpdate: updateTrigger + 1 });
  }, [count]);
  return (
    <React.Fragment>
      {ctx.cart.findIndex((x) => x.obj.id === props.object.id) !== -1 ? (
        <div className="product-grid-cart mb-2 mr-0 mr-md-2 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <div
              className="fa fa-remove mr-4"
              onClick={() => {
                let tmp = ctx.cart;
                if (tmp === undefined) return;
                tmp.splice(
                  tmp.findIndex((x) => x.id === props.object.id),
                  1
                );
                setctx({ ...ctx, cart: tmp });
              }}
            ></div>
            <div className="px-2"></div>
            <div className="d-flex flex-column justify-content-between pl-2">
              <div className="product-name">{props.object.data().name}</div>
              <div className="product-price">
                {props.object.data().price} L.L.
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div
              className="fa fa-minus color-dark"
              onClick={() => {
                if (count > 1) setCount(count - 1);
              }}
            ></div>
            <div className="px-3">
              {
                ctx.cart[
                  ctx.cart.findIndex((x) => x.obj.id === props.object.id)
                ].count
              }
            </div>
            <div
              className="fa fa-plus color-dark"
              onClick={() => {
                setCount(count + 1);
              }}
            ></div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </React.Fragment>
  );
}
