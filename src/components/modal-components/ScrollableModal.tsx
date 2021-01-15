import React from "react";
import ReactDOM from "react-dom";
import "./ScrollableModal-Style.css";

type Props = {
    children: React.ReactChild;
    closeModal: () => void;
};

const ScrollableModal = React.memo(({ children, closeModal }: Props) => {
    const domEl = document.getElementById("modal-root");

    if (!domEl) return null;

    return ReactDOM.createPortal(
        <div className={"smodal-wrapper"}>
            <div onClick={closeModal} className={"smodal-backdrop"}></div>
            <div className={"smodal-box"}>
                <i onClick={closeModal} className="fa fa-times modal--style"></i>
                {children}
            </div>
        </div>,
        domEl
    );
});

export default ScrollableModal;
