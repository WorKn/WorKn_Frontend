import React from "react";
import "./DeleteOfferPopup-Style.css";
import { removeMember } from "../../utils/apiRequests";

const DeleteOfferPopup = ({ memberId, hide }) => {
  const handleDelete = () => {
    removeMember(memberId).then((res) => {
      if (res.data !== undefined) {
        console.log(res);
        hide();
        window.confirm("Usuario borrado");
      }
    });
  };
  return (
    <div className="dop-wrapper">
      <div className="dop-wrapper__up-content">
        ¿Esta seguro/a que desea borrar este usuario?
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
