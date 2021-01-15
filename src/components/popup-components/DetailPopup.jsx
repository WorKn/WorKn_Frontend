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
import "../tag-components/Tag-Style.css";
import { store } from "react-notifications-component";

const DetailPopup = ({ responseInfo, hide }) => {
  const { state } = useStateMachine(updateAction);
  // const [interactionTarget, setInteractionTarget] = useState();
  const [offers, setOffers] = useState();
  // const [selectedOffer, setSelectedOffer] = useState();
  const { register, handleSubmit } = useForm({});
  const [profilePictureRoute, setProfilePictureRoute] = useState("");
  const [offererTitleRoute, setOffererTitleRoute] = useState("");
  const [profileRoute, setProfileRoute] = useState("");

  let MyDictionary = {};
  MyDictionary["free"] = "Freelancer";
  MyDictionary["fixed"] = "Fijo/Indefinido";
  MyDictionary["applicant"] = "Aplicante";

  useEffect(() => {
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
      setOffererTitleRoute(
        responseInfo?.createdBy?.name + " " + responseInfo?.createdBy?.lastname
      );
      setProfileRoute(`/users/${responseInfo.createdBy?._id}`);
    }
  }, [responseInfo]);

  const onSubmit = (data) => {
    if (state.userInformation.userType === "offerer") {
      createInteractionOA(responseInfo?._id, data.offer).then((res) => {
        if (res !== undefined && res?.data?.status === "success") {
          store.addNotification({
            title: "Interacción creada",
            message:
              "El usuario será notificado de tu demostración de interés, puedes visualizarla en tu página de Resumen",
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
    } else {
      createInteractionAO(responseInfo?._id).then((res) => {
        if (res !== undefined && res?.data?.status === "success") {
          store.addNotification({
            title: "Interacción creada",
            message:
              "El usuario será notificado de tu demostración de interés, puedes visualizarla en tu página de Resumen",
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
    }
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
                {responseInfo.title
                  ? responseInfo.title
                  : "Titulo no disponible"}
              </span>
              <div className="dp-wrapper__bullets">
                <ul>
                  <li>
                    Por <b>{offererTitleRoute} </b>
                    {responseInfo?.location ? (
                      <span>
                        {" "}
                        en <b>{responseInfo?.location}</b>
                      </span>
                    ) : null}
                  </li>
                  <li>
                    {responseInfo.offerType
                      ? MyDictionary[responseInfo?.offerType]
                      : "Info no disponible"}
                  </li>
                  {responseInfo?.createdAt ? (
                    <li>
                      Fecha de creación: {responseInfo?.createdAt?.slice(0, 10)}
                    </li>
                  ) : null}
                  {responseInfo?.closingDate ? (
                    <li>
                      Fecha de cierre: {responseInfo?.closingDate?.slice(0, 10)}
                    </li>
                  ) : null}
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
              {responseInfo.description
                ? responseInfo?.description
                : "Los detalles de la oferta no estan disponibles"}
            </p>
            <p className="dp-wrapper__salary">
              {responseInfo?.salaryRange ? (
                <p>
                  Rango salarial:<br></br>
                  <b>
                    RD$ {responseInfo?.salaryRange[0]} -{" "}
                    {responseInfo?.salaryRange[1]}
                  </b>
                </p>
              ) : null}
            </p>
            <p className="dp-wrapper_contact dp-wrapper_contact--ap">
              Contacto:<br></br>
              <Link
                to={profileRoute}
                target="_blank"
                style={{ textDecoration: "none", color: "#00ba6b" }}
              >
                {offererTitleRoute}
              </Link>
            </p>
          </div>
          <div className="dp-wrapper__button-content">
            <button
              className="custom-button custom-button--dpa bg-green "
              onClick={onSubmit}
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
                  {responseInfo?.location ? (
                    <li>
                      En <b> {responseInfo?.location} </b>
                    </li>
                  ) : null}
                  {responseInfo?.userType ? (
                    <li>{MyDictionary[responseInfo?.userType]}</li>
                  ) : null}
                  {responseInfo?.category?.name ? (
                    <li>{responseInfo?.category?.name}</li>
                  ) : null}
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
                : "Los detalles del usuario no estan disponibles"}
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
                <select className="sform__select" name="offer" ref={register}>
                  {offers?.data?.data?.offers.map((offer) => (
                    <option key={offer._id} value={offer._id}>
                      {offer.title}
                    </option>
                  ))}
                </select>
              ) : (
                "No hay ofertas"
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
