import React from "react";
import "./DeleteOfferPopup-Style.css";
import { closeChat } from "../../utils/apiRequests";
import { store } from "react-notifications-component";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
const DeleteChatPopup = ({ chatId, hide }) => {
    const updateChats = () => {
        if (state.userInformation.chatDeleted === true) {
            action({ chatDeleted: false });
        } else {
            action({ chatDeleted: true });
        }
    };
    const { state, action } = useStateMachine(updateAction);
    const triggerChatClose = () => {
        closeChat(chatId).then((res) => {
            if (res && res.data?.status === "success") {
                updateChats()
                store.addNotification({
                    title: "Chat eliminado correctamente",
                    message: "El chat fue removido de su bandeja de entrada.",
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
                hide();
            } else {
                store.addNotification({
                    title: "Ha ocurrido un error",
                    message: "El chat no pudo ser eliminidado, por favor recargue la pàgina.",
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
        });
    }
    return (
        <div className="dop-wrapper">
            <div className="dop-wrapper__up-content">
                ¿Esta seguro/a que desea borrar este chat?
      </div>
            <div className="dop-wrapper__down-content">
                <span
                    className="dop-wrapper__button dop-wrapper__button--accept"
                    onClick={triggerChatClose}
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

export default DeleteChatPopup;
