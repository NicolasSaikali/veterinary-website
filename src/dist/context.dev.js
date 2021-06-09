"use strict";

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CartContext = _react["default"].createContext(localStorage.getItem("cart") === "" || localStorage.getItem("cart") === null ? [] : JSON.parse(localStorage.getItem("cart")));

function AppContext() {
  return dispatchEvent;
}