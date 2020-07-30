import React, { useState } from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  const [display, setdisplay] = useState(false);

  const openModal = () => {
    setdisplay(true);
  };

  const closeModal = () => {
    setdisplay(false);
  };

  if (display) {
    return ReactDOM.createPortal(
      <div className={"modal-wrapper"}>
        <div onClick={closeModal} className={"modal-backdrop"}></div>
        <div className="modal-box">{props.children}</div>
      </div>,
      document.getElementById("modal-root")
    );
  }

  return null;
};

export default Modal;
