import React from "react";
import ReactDOM from "react-dom";
import "./Modal-Style.css";

type Props = {
  children: React.ReactChild;
  closeModal: () => void;
};

const Modal = React.memo(({ children, closeModal }: Props) => {
  const domEl = document.getElementById("modal-root");

  if (!domEl) return null;

  return ReactDOM.createPortal(
    <div className={"modal-wrapper"}>
      <div className={"modal-backdrop"}></div>
      <div className={"modal-box"}>
        <button onClick={closeModal}>Close</button>
        {children}
      </div>
    </div>,
    domEl
  );
});

export default Modal;
