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
import "./OfferPopup-Style.css";

const DetailPopup = ({ responseInfo, hide }) => {
  const { state } = useStateMachine(updateAction);
  const [interactionTarget, setInteractionTarget] = useState();
  const [offers, setOffers] = useState();
  const [selectedOffer, setSelectedOffer] = useState();
  const { register, handleSubmit } = useForm({});
  const [profilePictureRoute, setProfilePictureRoute] = useState("");
  const [offererTitleRoute, setOffererTitleRoute] = useState("");
  let MyDictionary = {};
  MyDictionary["free"] = "Freelancer";
  MyDictionary["fixed"] = "Fijo/Indefinido";
  MyDictionary["applicant"] = "Aplicante";

  useEffect(() => {
    getMyOffers().then((res) => {
      if (res !== undefined) {
        console.log(res);
        setOffers(res);
      }
    });
  }, []);

  useEffect(() => {
    if (responseInfo.organization) {
      setProfilePictureRoute(responseInfo?.organization?.profilePicture);
      setOffererTitleRoute(responseInfo?.organization?.name);
    } else {
      setProfilePictureRoute(responseInfo?.createdBy?.profilePicture);
      setOffererTitleRoute(responseInfo?.createdBy?.name);
    }
  }, [responseInfo]);

  useEffect(() => {
    if (interactionTarget && state.userInformation.userType === "applicant") {
      createInteractionAO(interactionTarget).then((res) => {
        if (res !== undefined) {
          console.log(res);
        }
      });
    } else {
      console.log("es ofertante");
    }
  }, [interactionTarget, state.userInformation.userType]);

  useEffect(() => {
    createInteractionOA(interactionTarget, selectedOffer).then((res) => {
      if (res !== undefined) {
        console.log(res);
      }
    });
  }, [interactionTarget, selectedOffer]);

  const onSubmit = (data) => {
    setSelectedOffer(data.offer);
    setInteractionTarget(responseInfo?._id);
  };

  return (
    <div>
      {(typeof state.userInformation.userType !== "undefined" &&
        state.userInformation.userType === "applicant") ||
      state.userInformation.userType === "" ? (
        <div>
          <div className="op-wrapper__up-content">
            <img src={profilePictureRoute} alt="Offerpp" />
            <div className="op-wrapper__text">
              <span className="op-wrapper__title">
                {responseInfo ? responseInfo.title : "Titulo no disponible"}
              </span>
              <div className="op-wrapper__bullets">
                <ul>
                  <li>
                    Por <b>{offererTitleRoute} </b> en{" "}
                    <b>
                      {responseInfo?.organization?.location
                        ? responseInfo?.organization?.location
                        : " Info no disponible"}
                    </b>
                  </li>
                  <li>
                    {responseInfo
                      ? MyDictionary[responseInfo?.offerType]
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
              <ul className="op-wrapper_tags">
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
          <div className="op-wrapper__down-content">
            <span className="op-wrapper__title op-wrapper__title--v2">
              Detalles de la oferta
            </span>
            <p className="op-wrapper__downinfo">
              {responseInfo
                ? responseInfo?.description
                : "Descripcion no disponible"}
            </p>
            <p className="op-wrapper__contact">
              Contacto:
              <Link
                to={`/organizations/${responseInfo.organization?._id}`}
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
            {/* <span className="dp-wrapper__cancel" onClick={hide}>
              Descartar
            </span> */}
          </div>
        </div>
      ) : (
        <div>
          <div className="dp-wrapper__up-content">
            <img src={responseInfo?.profilePicture} alt="Profile" />
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
              <ul className="dp-wrapper_tags">
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
              Biografía
            </span>
            <p className="dp-wrapper__downinfo">
              {responseInfo?.bio
                ? responseInfo?.bio
                : "Biografía no disponible"}
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
      )}
    </div>
  );
};

export default DetailPopup;
