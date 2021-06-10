import React, { useState, useEffect } from "react";
import { globalStateContext, dispatchStateContext } from "./../context";
import TopSlider from "./../components/top_slider";
import Loader from "./../components/loader";
export default function TrackOrder() {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [id, setID] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [ctx, setctx] = [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const handleSubmit = () => {
    setProducts([]);
    if (id.length === 0) {
      setSubmitted(false);
      return;
    }
    ctx.firestore
      .collection("orders")
      .doc(id)
      .get()
      .then((response) => {
        setLoading(false);
        console.log("response", response);
        setOrder(response);
        if (response.exists) {
          response.data().items.forEach((item) => {
            ctx.firestore
              .collection("products")
              .doc(item.id)
              .get()
              .then((response_2) => {
                setProducts([
                  ...products,
                  { object: response_2, count: item.count },
                ]);
              });
          });
        }
      });
    setLoading(true);
  };
  return (
    <div>
      <TopSlider />
      <div className="container track-order fade-in">
        <div className="section-padding">
          <h1>
            <strong className="text-uppercase">Track order</strong>
          </h1>
          <div className="w-100 py-3"></div>
          <h4>Enter the ID of the order to track</h4>
          <div className="w-100 py-2"></div>
          <div className="row justify-content-center justify-content-md-between">
            <div className="col-12 col-md-5">
              <input
                type="text"
                className={`text-fields ${
                  submitted && id == "" && "missing-field"
                }`}
                placeholder="Order no."
                onChange={(e) => {
                  setID(e.target.value);
                }}
              />
              <div className="w-100"></div>
              <button
                className="border-0 bg-green-dark text-light p-3 w-100 w-md-50"
                onClick={() => {
                  setSubmitted(true);
                  handleSubmit();
                }}
              >
                {loading ? <Loader white={true} /> : "TRACK ORDER"}
              </button>
            </div>
            <div className="col-md-6 py-5 py-md-0">
              {loading ? (
                <div className="w-100 text-center">
                  <Loader />
                </div>
              ) : order !== null && !order.exists ? (
                <b className="text-danger">no order has such ID</b>
              ) : order !== null && order.exists ? (
                <div className="order-results">
                  <h4 className="mr-3 position-relative float-left ">
                    Order: &nbsp;
                  </h4>
                  <div className="position-relative float-right">{id}</div>
                  <div className="w-100 py-1"></div>
                  Status:{" "}
                  <span className="text-danger"> {order.data().status}</span>
                  <div className="w-100 py-1"></div>
                  <table
                    className="w-100 w-md-auto"
                    border="1"
                    style={{ borderCollapse: "collapse" }}
                    cellPadding={5}
                  >
                    <thead>
                      <tr>
                        <th className="pr-3">Product</th>
                        <th className="pr-3">Qty</th>
                        <th className="pr-3">Price</th>
                        <th>Total</th>
                      </tr>
                      {products.map((product, i) => (
                        <tr key={`order_products_${i}`}>
                          <td>{product.object.data().name}</td>
                          <td>{product.count}</td>
                          <td>{product.object.data().price}</td>
                          <td>{product.object.data().price * product.count}</td>
                        </tr>
                      ))}
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{order.data().amount}</td>
                      </tr>
                    </thead>
                  </table>
                </div>
              ) : (
                <div>results here</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
