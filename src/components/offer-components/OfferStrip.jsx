import React, { useState, useEffect } from "react";
import "./OfferStrip-Style.css";
import Tag from "../tag-components/Tag";
import { useScrollableModal } from "../../hooks/useScrollableModal";
import InteractionPopup from "../../components/popup-components/InteractionPopup";
import { useStateMachine } from "little-state-machine";
import { Link } from "react-router-dom";
import updateAction from "../../updateAction";
import { acceptInteraction, rejectInteraction } from "../../utils/apiRequests";
// import DeleteOfferPopup from "../popup-components/DeleteOfferPopup";
import { store } from "react-notifications-component";
import { Scrollbars } from 'react-custom-scrollbars';

const OfferStrip = ({
  responseInfo,
  isMatch,
  isInteraction,
  interactionId,
}) => {
  // const { show: showDetailModal, RenderModal: DetailModal } = useModal();
  const { state, action } = useStateMachine(updateAction);
  const [profilePictureRoute, setProfilePictureRoute] = useState("");
  const [offererTitleRoute, setOffererTitleRoute] = useState("");
  const { show: showDetailModal, RenderModal: DetailModal } = useScrollableModal();
  const updateInteractions = () => {
    // setUpdateFlag(!updateFlag);
    if (state.userInformation.updateFlag === true) {
      action({ updateFlag: false });
    } else {
      action({ updateFlag: true });
    }
  };

  const sendInteractionId = () => {
    let chatPivot;
    if (state.userInformation.userType === "offerer") {
      chatPivot = {
        chatPivot: {
          interactionId,
          userInfo: responseInfo.applicant,
        },
      };
    } else {
      chatPivot = {
        chatPivot: {
          interactionId,
          userInfo: {
            ...responseInfo.offer.createdBy,
            organization: responseInfo.offer.organization,
          },
        },
      };
    }
    action(chatPivot);
  };

  const catchInteraction = () => {
    updateInteractions();
    acceptInteraction(responseInfo._id).then((res) => {
      if (res === "success") {
        store.addNotification({
          title: "Aplicación aceptada",
          message:
            "El usuario será notificado de tu demostración de interés, puedes comunicarte a través de los Matches.",
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
      } else {
        store.addNotification({
          title: "Ha ocurrido un error",
          message: res.message,
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
  };
  const deleteInteraction = () => {
    updateInteractions();
    rejectInteraction(responseInfo._id).then((res) => {
      store.addNotification({
        title: "Aplicación rechazada",
        message: "El usuario será removido de tu bandeja de resumen.",
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
    });
  };

  let MyDictionary = {};
  MyDictionary["free"] = "Freelancer";
  MyDictionary["fixed"] = "Fijo/Indefinido";

  useEffect(() => {
    if (responseInfo.offer.organization) {
      setProfilePictureRoute(responseInfo?.offer?.organization?.profilePicture);
      setOffererTitleRoute(responseInfo?.offer?.organization?.name);
    } else {
      setProfilePictureRoute(responseInfo?.offer?.createdBy?.profilePicture);
      setOffererTitleRoute(
        responseInfo?.offer?.createdBy?.name +
        " " +
        responseInfo?.offer?.createdBy?.lastname
      );
    }
  }, [responseInfo]);

  return (
    <div>
      <DetailModal>
        <InteractionPopup responseInfo={responseInfo}></InteractionPopup>
      </DetailModal>
      {/* <DeleteOfferModal>
        <DeleteOfferPopup
          responseInfo={responseInfo}
          hide={hideDeleteOfferModal}
        />
      </DeleteOfferModal> */}
      {(typeof state.userInformation.userType !== "undefined" &&
        state.userInformation.userType === "applicant") ||
        state.userInformation.userType === "" ? (
          <div className="offerstrip">
            <img
              src={profilePictureRoute}
              className="offerstrip__picture"
              alt="Offerpp"
            />
            <span
              className="offerstrip__text offerstrip__org text__clickable"
              onClick={showDetailModal}
            >
              {offererTitleRoute}
            </span>
            <span className="offerstrip__vl offerstrip__vl--1"></span>
            <span className="offerstrip__text offerstrip__type">
              {MyDictionary[responseInfo?.offer?.offerType]}
            </span>
            <span className="offerstrip__vl offerstrip__vl--2"></span>
            <span className="offerstrip__text offerstrip_offer">
              {responseInfo?.offer?.title}
            </span>
            <span className="offerstrip__vl offerstrip__vl--3"></span>
            <Scrollbars style={{ width: 300, height: 35 }}
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
            >
              <div className="offerstrip__tagscontainer">
                {responseInfo?.offer?.tags?.map((tag) => (
                  <Tag
                    key={tag.id}
                    text={tag.name}
                    theme="tag tag__text tag__text--gray"
                  ></Tag>
                ))}
              </div>
            </Scrollbars>
            <span className="offerstrip__vl offerstrip__vl--4"></span>
            {typeof isMatch !== "undefined" && isMatch === "true" ? (
              <Link to="/chat" style={{ textDecoration: "none" }}>
                <button
                  onClick={sendInteractionId}
                  className="offerstrip__action offerstrip__action--green"
                >
                  <i className="fa fa-comments userprofile__icon"></i>
                Chat
              </button>
              </Link>
            ) : (
                ""
                // <span className="offerstrip_text offerstrip_edit">Editar</span>
              )}
            {typeof isInteraction !== "undefined" && isInteraction === "true" ? (
              <React.Fragment>
                <button
                  onClick={catchInteraction}
                  className="offerstrip__action offerstrip__action--green"
                >
                  <i className="fa fa-check userprofile__icon"></i>
                Aceptar
              </button>
                {/* <Link to="/chat" style={{ textDecoration: "none" }}> */}
                <button
                  onClick={deleteInteraction}
                  className="offerstrip__action offerstrip__action--red"
                >
                  <i className="fa fa-times userprofile__icon"></i>
                Declinar
              </button>
                {/* </Link> */}
              </React.Fragment>
            ) : (
                ""
              )}
            {/* <i
            className="fa fa-times offerstrip_icon offerstrip_delete"
            onClick={showDeleteOfferModal}
          ></i> */}
          </div>
        ) : (
          <div className="offerstrip">
            <img
              src={responseInfo?.applicant?.profilePicture}
              className="offerstrip__picture"
              alt="Offerpp"
            />
            <span
              className="offerstrip__text offerstrip__offer text__clickable"
              onClick={showDetailModal}
            >
              {responseInfo?.applicant?.name} {responseInfo?.applicant?.lastname}
            </span>
            <span className="offerstrip__vl offerstrip__vl--1"></span>
            <span className="offerstrip__text offerstrip__type">
              {responseInfo?.applicant?.email}
            </span>
            <span className="offerstrip__vl offerstrip__vl--2"></span>
            <span className={`offerstrip__text offerstrip__org  ${state.userInformation.userType === "applicant" ? "text__clickable" : ""} `}>
              {responseInfo?.applicant?.category?.name}
            </span>
            <span className="offerstrip__vl offerstrip__vl--3"></span>
            <Scrollbars style={{ width: 300, height: 35 }}
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
            >
              <div className="offerstrip__tagscontainer">
                {responseInfo?.applicant?.tags?.map((tag) => (
                  <Tag
                    key={tag.id}
                    text={tag.name}
                    theme="tag tag__text tag__text--gray"
                  ></Tag>
                ))}
              </div>
            </Scrollbars>
            <span className="offerstrip__vl offerstrip__vl--4"></span>
            {typeof isMatch !== "undefined" && isMatch === "true" ? (
              <Link to="/chat" style={{ textDecoration: "none" }}>
                <button
                  onClick={sendInteractionId}
                  className="offerstrip__action offerstrip__action--green"
                >
                  <i className="fa fa-comments userprofile__icon"></i>
                Chat
              </button>
              </Link>
            ) : (
                ""
              )}
            {typeof isInteraction !== "undefined" && isInteraction === "true" ? (
              <React.Fragment>
                <button
                  onClick={catchInteraction}
                  className="offerstrip__action offerstrip__action--green"
                >
                  <i className="fa fa-check userprofile__icon"></i>
                Aceptar
              </button>
                {/* <Link to="/chat" style={{ textDecoration: "none" }}> */}
                <button
                  onClick={deleteInteraction}
                  className="offerstrip__action offerstrip__action--red"
                >
                  <i className="fa fa-times userprofile__icon"></i>
                Declinar
              </button>
                {/* </Link> */}
              </React.Fragment>
            ) : (
                ""
              )}

            {/* <i
            className="fa fa-times offerstrip_icon offerstrip_delete"
            onClick={showDeleteOfferModal}
          ></i> */}
          </div>
        )
      }
    </div >
  );
};

export default OfferStrip;
