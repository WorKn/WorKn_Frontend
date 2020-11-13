import React from "react";
import "./DeleteOfferPopup-Style.css";
import { removeMember } from "../../utils/apiRequests";
import { store } from "react-notifications-component";

const DeleteOfferPopup = ({ memberId, hide }) => {
  const handleDelete = () => {
    removeMember(memberId).then((res) => {
      if (res.data !== undefined) {
        if (res?.data?.status && res?.data?.status === "success") {
          store.addNotification({
            title: "Usuario eliminado correctamente",
            message:
              "El miembro fue eliminado de " +
              res?.data?.data?.organization?.name,
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
        } else if (res?.data?.status && res?.data?.status === "fail") {
          store.addNotification({
            title: "Ha ocurrido un error",
            message: res?.data?.message,
            type: "danger",
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
