import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import admin, { firestore } from "firebase-admin";
import React, { useState, useEffect, createContext, useContext } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyB9ZE0l4S6AlG0N4u5kWBU7kq_Sa-RexgQ",
  authDomain: "salocin.firebaseapp.com",
  projectId: "salocin",
  storageBucket: "salocin.appspot.com",
  messagingSenderId: "2655309097",
  appId: "1:2655309097:web:5e1556371137495176bb38",
};
// const firebaseConfig = {
//   apiKey: "AIzaSyAM8L4Cig_StX5_CWJ69ckBkUeOvZjbIaY",
//   authDomain: "animal-hospital-3ff55.firebaseapp.com",
//   projectId: "animal-hospital-3ff55",
//   storageBucket: "animal-hospital-3ff55.appspot.com",
//   messagingSenderId: "1034135343374",
//   appId: "1:1034135343374:web:7241be56f08f475a14475f",
//   measurementId: "G-SCF747GVCT",
// };

firebase.initializeApp(firebaseConfig);

const functions = require("firebase-functions");
const auth = firebase.auth();

export const defaultGlobalState = {
  countUpdate: 0,
  total: 0,
  triggerCart: "",
  cartOpen: false,
  firebase: firebase,
  firestore: firebase.firestore(),
  cart: [],
};
export const globalStateContext = React.createContext(defaultGlobalState);
export const dispatchStateContext = React.createContext(undefined);

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({ ...state, ...newValue }),
    defaultGlobalState
  );
  useEffect(() => {
    let total = 0;
    let previousCart =
      localStorage.getItem("cart") === "" ||
      localStorage.getItem("cart") === null
        ? []
        : JSON.parse(localStorage.getItem("cart"));
    let resultingCart = [];
    if (previousCart.length > 0) {
      previousCart.forEach((elt) => {
        firebase
          .firestore()
          .collection("products")
          .doc(elt.id)
          .get()
          .then((response) => {
            total += response.data().price * elt.count;

            let tmp = state.cart;
            tmp.push({
              obj: response,
              count: elt.count,
            });
            dispatch({ ...state, cart: tmp, total: total });
          });
      });
    }
  }, []);

  useEffect(() => {
    let tmp = [];
    let total = 0;
    state.cart.forEach((elt) => {
      total += elt.obj.data().price * elt.count;
      tmp.push({ id: elt.obj.id, count: elt.count });
    });
    localStorage.setItem("cart", JSON.stringify(tmp));
    dispatch({ ...state, total: total });
  }, [state.countUpdate, state.cart.length]);
  return (
    <globalStateContext.Provider value={state}>
      <dispatchStateContext.Provider value={dispatch}>
        {children}
      </dispatchStateContext.Provider>
    </globalStateContext.Provider>
  );
};
