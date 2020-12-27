import React from "react";
import "./DeleteOfferPopup-Style.css";
import { deleteOffer, getMyOffers } from "../../utils/apiRequests";
import { deleteOffer } from "../../utils/apiRequests";
import { store } from "react-notifications-component";

const DeleteOfferPopup = ({ offerInfo, hide, setMyOffers }) => {
  const handleDelete = () => {
    let id = offerInfo._id;
    deleteOffer(id).then((res) => {
      getMyOffers().then((res) => {
        setMyOffers(res.data.data.offers);
      });
      if (res && res !== undefined) {
        store.addNotification({
          title: "Oferta eliminada correctamente",
          message: "La oferta seleccionada fue elimininada de su organización.",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 10000,
            onScreen: true,
          },
        });
      }
      hide();
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
