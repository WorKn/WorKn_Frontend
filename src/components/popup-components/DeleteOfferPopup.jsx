import React from "react";
import "./DeleteOfferPopup-Style.css";
import { deleteOffer } from "../../utils/apiRequests";

const DeleteOfferPopup = ({ hide }) => {
  const handleDelete = () => {
    let id = offerInfo._id;
    deleteOffer(id).then((res) => {
      hide();
    });
  };
  return (
    <div className="dop-wrapper">
      <div className="dop-wrapper__up-content">
        ¿Esta seguro/a que desea borrar esta oferta?
      </div>
      <div className="dop-wrapper__down-content">
        <span className="dop-wrapper__accept" onClick={handleDelete}>
          Si, estoy seguro/a
        </span>
        <span className="dop-wrapper__cancel" onClick={hide}>
          No, deseo cancelar
        </span>
      </div>
    </div>
  );
};

export default DeleteOfferPopup;
