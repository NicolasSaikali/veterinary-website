import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Loader from "./../../components/loader";
import TopSlider from "./../../components/top_slider";
import { globalStateContext, dispatchStateContext } from "./../../context";
export default function ProductPage(props) {
  const [ctx, setctx] = [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [imageURL, setImageURL] = useState(null);
  const [product, setProduct] = useState(null);
  const [selected, setSelected] = useState(false);
  const location = useLocation();
  const [count, setCount] = useState(1);
  useEffect(() => {
    ctx.firestore
      .collection("products")
      .doc(location.state.id)
      .get()
      .then((response) => {
        setProduct(response);
      });
  }, []);
  useEffect(() => {
    if (product === null) return;
    if (product.data().images.length === 0) return;
    ctx.firebase
      .storage()
      .ref("/" + product.data().images[0].split("/")[0])
      .child(product.data().images[0].split("/")[1])
      .getDownloadURL()
      .then((url) => {
        setImageURL(url);
      });
  }, [product]);
  return (
    <React.Fragment>
      <TopSlider />
      <div className="section-padding single-product fade-in">
        {product === null ? (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <Loader />
          </div>
        ) : (
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <img
                  src={imageURL}
                  alt=""
                  className={`main-product-image w-100 h-100 ${
                    product.data().stock_no === "0" && "grayscale"
                  }`}
                />
              </div>
              <div className="col-lg-6 pt-3 pt-lg-0">
                <div className="row">
                  <h2 class="mb-3">{product.data().name}</h2>
                  <div className="col-12"> {product.data().description}</div>
                  <div className="d-block py-3">
                    {product.data().price} L.L.
                  </div>
                  <div className="col-12 pt-3">
                    {product.data().stock_no === "0" ? (
                      <h3 className="text-uppercase text-dark">out of stock</h3>
                    ) : ctx.cart.findIndex((p) => p.obj.id === product.id) ===
                      -1 ? (
                      <div className="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                          <div
                            className="fa fa-minus color-dark"
                            onClick={() => {
                              if (count === 1) return;
                              setCount(count - 1);
                            }}
                          ></div>
                          <div className="px-3"></div>
                          <strong style={{ fontSize: "20px" }}>{count}</strong>
                          <div className="px-3"></div>
                          <div
                            className="fa fa-plus color-dark"
                            onClick={() => {
                              setCount(count + 1);
                            }}
                          ></div>
                        </div>
                        <button
                          className="border-0 text-light bg-green-dark p-3"
                          onClick={() => {
                            setctx({
                              ...ctx,
                              cart: [
                                ...ctx.cart,
                                { obj: product, count: count },
                              ],
                            });
                          }}
                        >
                          ADD TO CART
                        </button>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-between">
                        <strong style={{ fontSize: "20px" }}>
                          {
                            ctx.cart[
                              ctx.cart.findIndex((p) => p.obj.id === product.id)
                            ].count
                          }
                        </strong>

                        <button
                          className="border-0 text-light bg-danger p-3 position-relative float-right"
                          onClick={() => {
                            let tmp = ctx.cart;
                            tmp.splice(
                              tmp.findIndex((x) => x.obj.id === product.id),
                              1
                            );
                            setctx({ ...ctx, cart: tmp });
                          }}
                        >
                          REMOVE FROM CART
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
