import React, { useEffect, useState } from "react";
import {
  createInteractionAO,
  createInteractionOA,
} from "../../utils/apiRequests";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
import { getMyOffers } from "../../utils/apiRequests";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Tag from "../tag-components/Tag";
import "./DetailPopup-Style.css";
import { store } from 'react-notifications-component';

const DetailPopup = ({ responseInfo, hide }) => {
  const { state } = useStateMachine(updateAction);
  const [interactionTarget, setInteractionTarget] = useState();
  const [offers, setOffers] = useState();
  const [selectedOffer, setSelectedOffer] = useState();
  const { register, handleSubmit } = useForm({});
  const [profilePictureRoute, setProfilePictureRoute] = useState("");
  const [offererTitleRoute, setOffererTitleRoute] = useState("");
  const [profileRoute, setProfileRoute] = useState("");

  let MyDictionary = {};
  MyDictionary["free"] = "Freelancer";
  MyDictionary["fixed"] = "Fijo/Indefinido";
  MyDictionary["applicant"] = "Aplicante";

  useEffect(() => {
    console.log(responseInfo);
    getMyOffers().then((res) => {
      if (res !== undefined) {
        setOffers(res);
      }
    });
  }, []);

  useEffect(() => {
    if (responseInfo.organization) {
      setProfilePictureRoute(responseInfo?.organization?.profilePicture);
      setOffererTitleRoute(responseInfo?.organization?.name);
      setProfileRoute(`/organizations/${responseInfo.organization?._id}`);
    } else {
      setProfilePictureRoute(responseInfo?.createdBy?.profilePicture);
      setOffererTitleRoute(responseInfo?.createdBy?.name);
      setProfileRoute(`/users/${responseInfo.createdBy?._id}`);
    }
  }, [responseInfo]);

  useEffect(() => {
    if (interactionTarget && state.userInformation.userType === "applicant") {
      createInteractionAO(interactionTarget).then((res) => {
        if (res !== undefined) {
          if (res?.data?.status && res?.data?.status === "success") {
            store.addNotification({
              title: "Interacción creada correctamente!",
              message: "Puedes confirmar la interacción en tu página de resumen",
              type: "success",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 10000,
                onScreen: true
              }
            });
          } else if (res?.status && res?.status === "fail") {
            store.addNotification({
              title: "Ha ocurrido un error",
              message: res?.message,
              type: "danger",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 10000,
                onScreen: true
              }
            });
          }
        }
      });
    } else {
    }
  }, [interactionTarget, state.userInformation.userType]);

  useEffect(() => {
    if (interactionTarget && selectedOffer) {
      createInteractionOA(interactionTarget, selectedOffer).then((res) => {
        if (res !== undefined) {
          if (res?.data?.status && res?.data?.status === "success") {
            store.addNotification({
              title: "Interacción creada correctamente!",
              message: "Puedes confirmar la interacción en tu página de resumen",
              type: "success",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 10000,
                onScreen: true
              }
            });
          } else if (res?.status && res?.status === "fail") {
            store.addNotification({
              title: "Ha ocurrido un error",
              message: res?.message,
              type: "danger",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 10000,
                onScreen: true
              }
            });
          }
        }
      });
    }

  }, [interactionTarget, selectedOffer]);

  const onSubmit = (data) => {
    setSelectedOffer(data.offer);
    setInteractionTarget(responseInfo?._id);
  };

  return (
    <div className="dp-wrapper">
      {(typeof state.userInformation.userType !== "undefined" &&
        state.userInformation.userType === "applicant") ||
        state.userInformation.userType === "" ? (
          <div className="dp-wrapper__child">
            <div className="dp-wrapper__up-content">
              <div className="dp-wrapper__img">
                <img src={profilePictureRoute} alt="Offerpp" />
              </div>
              <div className="dp-wrapper__text">
                <span className="dp-wrapper__title">
                  {responseInfo ? responseInfo.title : "Titulo no disponible"}
                  {typeof responseInfo?.organization?.isVerified && responseInfo?.organization?.isVerified === true ? (
                    <div className="profile__validated tooltip"><span className="tooltiptext">Esta organización está verificada</span><i class="fa fa-check profile__validatedicon"></i></div>
                  ) : (
                      ""
                    )}
                </span>
                <div className="dp-wrapper__bullets">
                  <ul>
                    <li>
                      Por <b>{offererTitleRoute} </b> en{" "}
                      <b>
                        Santo Domingo
                      {/* {responseInfo?.organization?.location
                        ? responseInfo?.organization?.location
                        : " Info no disponible"} */}
                      </b>
                    </li>
                    <li>
                      {responseInfo
                        ? MyDictionary[responseInfo?.offerType]
                        : "Info no disponible"}
                    </li>
                    <li>
                      Fecha de creación:{" "}
                      {responseInfo?.createdAt
                        ? `${responseInfo?.createdAt?.slice(0, 10)}`
                        : "Info no disponible"}
                    </li>
                    <li>
                      Fecha de cierre:{" "}
                      {responseInfo?.closingDate
                        ? `${responseInfo?.closingDate?.slice(0, 10)}`
                        : "Info no disponible"}
                    </li>
                  </ul>
                </div>
                <ul className="dp-wrapper__tags">
                  {responseInfo?.tags?.map((tag) => (
                    <Tag
                      key={tag._id}
                      text={tag.name}
                      theme="tag tag--small tag__text tag__text--small tag__text--gray"
                    ></Tag>
                  ))}
                </ul>
              </div>
            </div>
            <div className="dp-wrapper__down-content">
              <span className="dp-wrapper__title dp-wrapper__title--v2">
                Detalles de la oferta
            </span>
              <p className="dp-wrapper__downinfo dp-wrapper__downinfo--ap">
                {responseInfo
                  ? responseInfo?.description
                  : "Descripcion no disponible"}
              </p>
              <p className="dp-wrapper__salary">
                Rango salarial:
              <b>
                  RD${" "}
                  {responseInfo?.salaryRange
                    ? responseInfo?.salaryRange[0]
                    : "Descripcion no disponible"}{" "}
                -{" "}
                  {responseInfo?.salaryRange
                    ? responseInfo?.salaryRange[1]
                    : "Descripcion no disponible"}
                </b>
              </p>
              <p className="dp-wrapper__contact dp-wrapper__contact--ap">
                Contacto:
              <Link
                  to={profileRoute}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  {offererTitleRoute}
                </Link>
              </p>
            </div>
            <div className="dp-wrapper__button-content">
              <button
                className="custom-button custom-button--dpa bg-green "
                onClick={() => {
                  console.log(responseInfo?._id);
                  setInteractionTarget(responseInfo?._id);
                  console.log(selectedOffer);
                }}
              >
                Aplicar
            </button>
            </div>
          </div>
        ) : (
          <div className="dp-wrapper__child">
            <div className="dp-wrapper__up-content">
              <div className="dp-wrapper__img">
                <img src={responseInfo?.profilePicture} alt="Profile" />
              </div>
              <div className="dp-wrapper__text">
                <span className="dp-wrapper__title">
                  {" "}
                  {responseInfo?.name} {responseInfo?.lastname}
                </span>
                <div className="dp-wrapper__bullets">
                  <ul>
                    <li>
                      En
                    <b> Santo Domingo</b>
                    </li>
                    <li>
                      {responseInfo?.userType
                        ? MyDictionary[responseInfo?.userType]
                        : "Info no disponible"}
                    </li>
                    <li>
                      {responseInfo?.category?.name
                        ? responseInfo?.category?.name
                        : "Info no disponible"}
                    </li>
                  </ul>
                </div>
                <ul className="dp-wrapper__tags">
                  {responseInfo?.tags?.map((tag) => (
                    <Tag
                      key={tag._id}
                      text={tag.name}
                      theme="tag tag--small tag__text tag__text--small tag__text--gray"
                    ></Tag>
                  ))}
                </ul>
              </div>
            </div>
            <div className="dp-wrapper__down-content">
              <span className="dp-wrapper__title dp-wrapper__title--v2">
                Detalles del usuario
            </span>
              <p className="dp-wrapper__downinfo">
                {responseInfo?.bio
                  ? responseInfo?.bio
                  : "Detalles del usuario no disponible"}
              </p>
              <div className="dp-wrapper__contact">
                Contacto:
              <Link
                  to={`/users/${responseInfo?._id}`}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  {responseInfo?.name} {responseInfo?.lastname}
                </Link>
              </div>
            </div>
            <div className="dp-wrapper__child--form">
              <form onSubmit={handleSubmit(onSubmit)}>
                {typeof offers ? (
                  <select
                    className="form__select form__select--dp"
                    name="offer"
                    ref={register}
                  >
                    {offers?.data?.data?.offers.map((offer) => (
                      <option key={offer._id} value={offer._id}>
                        {offer.title}
                      </option>
                    ))}
                  </select>
                ) : (
                    "No hay"
                  )}
                <input
                  className="custom-button bg-green"
                  type="submit"
                  value="Demostrar interés"
                />
              </form>
            </div>
          </div>
        )}
    </div>
  );
};

export default DetailPopup;
