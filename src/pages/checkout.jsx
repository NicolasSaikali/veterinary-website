import React, { useState, useEffect, useContext } from "react";
import { globalStateContext, dispatchStateContext } from "./../context";
import TopSlider from "./../components/top_slider";
import { useLocation } from "react-router";
import ConfirmModal from "./../components/confirmModal";
import Loader from "./../components/loader";
export default function Checkout() {
  let LOCATION = useLocation();
  const [ctx, setctx] = [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [shouldEmpty, setShouldEmpty] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    comments: "",
    paymentMethod: "",
    cardData: {
      no: "",
      expiryDate: "",
    },
    amount: ctx.total,
  });
  const [resetOrder, setResetOrder] = useState({
    status: false,
    callBack: function () {
      setctx({ ...ctx, cart: [] });
    },
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    console.log(data);
  });
  const handleSubmit = () => {
    for (let i in data)
      if (i !== "comments" && i !== "cartData" && data.paymentMethod !== "card")
        if (data[i].length === 0) return;
    if (
      data.paymentMethod === "card" &&
      (data.cardData.no === "" || data.cardData.expiryDate === "")
    )
      return;

    ctx.firebase
      .firestore()
      .collection("orders")
      .doc()
      .set({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comments: data.comments,
        paymentMethod: data.paymentMethod,
        cardData: data.paymentMethod === "cash" ? null : data.cardData,
        datePlaced: new Date(),
        items: JSON.parse(localStorage.getItem("cart")),
        amount: data.amount,
        status: "pending",
      })
      .then((response) => {
        console.log(response);
        setctx({ ...ctx, cart: [] });
        setShouldEmpty(true);
        setOrderPlaced(false);
      });
  };
  const handleChange = (key, value) => {};
  return (
    <div className="fade-in">
      <TopSlider />
      <div className="container py-4">
        <div className="section-title">
          <h1 className="text-uppercase">checkout</h1>
        </div>
        <div className="w-100 py-3"></div>
        <div className="d-flex justify-content-center pb-4">
          <div style={{ width: 500, maxWidth: "95%" }}>
            <input
              value={shouldEmpty ? "" : data.firstname}
              onFocus={() => {
                setShouldEmpty(false);
              }}
              onChange={(e) => {
                setData({ ...data, firstname: e.target.value });
              }}
              type="text"
              name=""
              id=""
              className={`${
                orderPlaced && data.firstname === "" && "missing-field"
              } text-fields`}
              placeholder="First Name"
            />
            <input
              value={shouldEmpty ? "" : data.lastname}
              onFocus={() => {
                setShouldEmpty(false);
              }}
              onChange={(e) => {
                setData({ ...data, lastname: e.target.value });
              }}
              type="text"
              name=""
              id=""
              className={`${
                orderPlaced && data.lastname === "" && "missing-field"
              } text-fields`}
              placeholder="Last Name"
            />
            <input
              value={shouldEmpty ? "" : data.email}
              onFocus={() => {
                setShouldEmpty(false);
              }}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
              type="email"
              name=""
              id=""
              className={`${
                orderPlaced && data.email === "" && "missing-field"
              } text-fields`}
              placeholder="Email"
            />
            <input
              value={shouldEmpty ? "" : data.phone}
              onFocus={() => {
                setShouldEmpty(false);
              }}
              onChange={(e) => {
                setData({ ...data, phone: e.target.value });
              }}
              type="text"
              name=""
              id=""
              className={`${
                orderPlaced && data.phone === "" && "missing-field"
              } text-fields`}
              placeholder="Phone"
            />
            <textarea
              onFocus={() => {
                setShouldEmpty(false);
              }}
              defaultValue={shouldEmpty ? "" : data.address}
              onChange={(e) => {
                setData({ ...data, address: e.target.value });
              }}
              type="text"
              name=""
              id=""
              className={`${
                orderPlaced && data.address === "" && "missing-field"
              } text-fields`}
              placeholder="Address (Governorate, City, Street, Building)"
            ></textarea>
            <textarea
              onChange={(e) => {
                setData({ ...data, comments: e.target.value });
              }}
              type="text"
              name=""
              id=""
              className={`text-fields`}
              placeholder="Additional Comments"
            ></textarea>
            <table className="w-100">
              <tr>
                <th>Amount</th>
                <th>Number of products</th>
              </tr>
              <tr>
                <td>{ctx.total} L.L.</td>
                <td>{ctx.cart.length}</td>
              </tr>
            </table>
            <div className="w-100 py-3"></div>
            <h4 className="mb-4 mt-3">Payment Method</h4>
            <div className="d-block mb-1">
              <input
                value={shouldEmpty ? "" : data.firstname}
                onFocus={() => {
                  setShouldEmpty(false);
                }}
                type="radio"
                name="payment"
                id="cash"
                onChange={(e) => {
                  setData({ ...data, paymentMethod: e.target.id });
                }}
              />
              <div className="px-2 d-inline-block"></div>
              <label htmlFor="cash">Cash on Delivery</label>
            </div>
            <div className="d-block">
              <input
                value={shouldEmpty ? "" : data.firstname}
                onFocus={() => {
                  setShouldEmpty(false);
                }}
                type="radio"
                name="payment"
                id="card"
                onChange={(e) => {
                  setData({ ...data, paymentMethod: e.target.id });
                }}
              />
              <div className="px-2 d-inline-block"></div>
              <label htmlFor="card">Credit Card</label>
            </div>
            {data.paymentMethod === "card" ? (
              <div className="pt-3">
                <input
                  value={shouldEmpty ? "" : data.firstname}
                  onFocus={() => {
                    setShouldEmpty(false);
                  }}
                  onChange={(e) => {
                    setData({
                      ...data,
                      cardData: { ...data.cardData, no: e.target.value },
                    });
                  }}
                  type="number"
                  name=""
                  id=""
                  className={`${
                    orderPlaced &&
                    data.paymentMethod === "card" &&
                    data.cardData.no === "" &&
                    "missing-field"
                  } text-fields`}
                  placeholder="Card No."
                />
                <input
                  value={shouldEmpty ? "" : data.firstname}
                  onFocus={() => {
                    setShouldEmpty(false);
                  }}
                  onChange={(e) => {
                    setData({
                      ...data,
                      cardData: {
                        ...data.cardData,
                        expiryDate: e.target.value,
                      },
                    });
                  }}
                  type="date"
                  name=""
                  id=""
                  className={`${
                    orderPlaced &&
                    data.paymentMethod === "card" &&
                    data.cardData.expiryDate === "" &&
                    "missing-field"
                  } text-fields`}
                  placeholder="Card No."
                />
              </div>
            ) : (
              <div></div>
            )}
            <div className="w-100 py-3"></div>
            <button
              className="border-0 bg-green-dark text-light p-3 w-100 w-md-50"
              onClick={() => {
                // if (orderPlaced) return;
                setOrderPlaced(true);
                handleSubmit();
              }}
            >
              {orderPlaced ? <Loader white={true} /> : "PLACE ORDER"}
            </button>
            <div className="w-100 py-2"></div>
          </div>
        </div>
      </div>
      )
    </div>
  );
}
