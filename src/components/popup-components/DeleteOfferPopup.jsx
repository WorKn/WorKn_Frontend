import React from "react";
import "./DeleteOfferPopup-Style.css";
import { deleteOffer, getMyOffers } from "../../utils/apiRequests";

const DeleteOfferPopup = ({ offerInfo, hide, setMyOffers }) => {
  const handleDelete = () => {
    let id = offerInfo._id;
    deleteOffer(id).then((res) => {
      getMyOffers().then((res) => {
        setMyOffers(res.data.data.offers);
      });
      setTimeout(() => {
        hide();
      }, 1500);
    });
  };
  return (
    <div className="dop-wrapper">
      <div className="dop-wrapper__up-content">
        ¿Esta seguro/a que desea borrar esta oferta?
      </div>
      <div className="dop-wrapper__down-content">
        <span
          className="dop-wrapper__button dop-wrapper__button--accept"
          onClick={handleDelete}
        >
          Si, estoy seguro/a
        </span>
        <span
          className="dop-wrapper__button dop-wrapper__button--cancel"
          onClick={hide}
        >
          No, deseo cancelar
        </span>
      </div>
    </div>
  );
};

export default DeleteOfferPopup;
