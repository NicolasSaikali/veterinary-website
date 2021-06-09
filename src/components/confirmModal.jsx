import React, { useState, useEffect } from "react";
import { globalStateContext, dispatchStateContext } from "./../context";

export default function ConfirmModal(props) {
  const [closed, setClosed] = useState(false);
  const [callBack, setCallBack] = useState(props.callBack);
  useState(() => {
    alert("test");
  });
  return (
    <div
      className={`confirm-modal-wrapper position-fixed top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center ${
        closed && "d-none"
      }`}
    >
      <div className="confirm-modal bg-light">
        <div className="confirm-modal-inner p-3">
          <h5>Are you sure?</h5>
          <div className="w-100 py-3"></div>
          <div className="d-flex w-100 justify-content-between">
            <button
              className="p-3 bg-green-dark text-light"
              onClick={() => {
                callBack();
                setClosed(true);
              }}
            >
              YES
            </button>
            <button
              className="p-3 bg-secondary text-light"
              onClick={() => {
                setClosed(true);
              }}
            >
              NO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
