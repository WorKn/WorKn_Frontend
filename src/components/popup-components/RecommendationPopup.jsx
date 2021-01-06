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

const DetailPopup = ({ personInfo, offerInfo }) => {
  const { state } = useStateMachine(updateAction);
  const [profilePictureRoute, setProfilePictureRoute] = useState("");
  const [offererTitleRoute, setOffererTitleRoute] = useState("");
  const [profileRoute, setProfileRoute] = useState("");
  const { register, handleSubmit } = useForm({});
  const [offers, setOffers] = useState();

  let MyDictionary = {};
  MyDictionary["free"] = "Freelancer";
  MyDictionary["fixed"] = "Fijo/Indefinido";
  MyDictionary["applicant"] = "Aplicante";

  console.log(offerInfo);

  useEffect(() => {
    if (state.userInformation.userType === "applicant") {
      if (offerInfo?.organization) {
        setProfilePictureRoute(offerInfo.organization?.profilePicture);
        setOffererTitleRoute(offerInfo.organization.name);
        setProfileRoute(`/organizations/${offerInfo.organization?._id}`);
      } else {
        setProfilePictureRoute(offerInfo.createdBy?.profilePicture);
        setOffererTitleRoute(
          offerInfo.createdBy?.name + " " + offerInfo.createdBy?.lastname
        );
        setProfileRoute(`/users/${offerInfo.createdBy?.id}`);
      }
    } else {
      setProfilePictureRoute(personInfo.profilePicture);
      setOffererTitleRoute(personInfo.name + " " + personInfo.lastname);
      setProfileRoute(`/users/${personInfo?._id}`);
    }
  }, [offerInfo, personInfo, state.userInformation.userType]);


  useEffect(() => {
    if (state.userInformation.userType === "offerer") {
      getMyOffers().then((res) => {
        if (res !== undefined) {
          console.log(res);
          setOffers(res);
        }
      });
    }
  }, [state.userInformation.userType]);


  const onSubmit = (data) => {
    if (state.userInformation.userType === "offerer") {
      createInteractionOA(personInfo._id, data.offer).then((res) => {
        console.log(res);
        if (res !== undefined && res?.data?.status === 'success') {
          store.addNotification({
            title: "Interacción creada",
            message: "El usuario será notificado de tu demostración de interés, puedes visualizarla en tu página de Resumen",
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
      createInteractionAO(offerInfo._id).then((res) => {
        console.log(res);
        if (res !== undefined && res?.data?.status === 'success') {
          store.addNotification({
            title: "Interacción creada",
            message: "El usuario será notificado de tu demostración de interés, puedes visualizarla en tu página de Resumen",
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
  }

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
                  {offerInfo?.title ? offerInfo.title : "Titulo no disponible"}
                </span>
                <div className="dp-wrapper__bullets">
                  <ul>
                    <li>
                      Por <b>{offererTitleRoute}</b>
                      {offerInfo?.createdBy?.location ? (
                        <span>
                          {" "}
                        en <b>{offerInfo?.createdBy?.location}</b>
                        </span>
                      ) : null}
                    </li>
                    <li>
                      {offerInfo.offerType
                        ? MyDictionary[offerInfo?.offerType]
                        : "Info no disponible"}
                    </li>
                    {offerInfo?.createdAt ? (
                      <li>
                        Fecha de creación: {offerInfo?.createdAt?.slice(0, 10)}
                      </li>
                    ) : null}
                    {offerInfo?.closingDate ? (
                      <li>
                        Fecha de cierre: {offerInfo?.closingDate?.slice(0, 10)}
                      </li>
                    ) : null}
                  </ul>
                </div>
                <ul className="dp-wrapper__tags">
                  {offerInfo?.tags?.map((tag) => (
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
                {offerInfo.description
                  ? offerInfo?.description
                  : "Los detalles de la oferta no estan disponibles"}
              </p>
              <p className="dp-wrapper__salary">
                {offerInfo?.salaryRange ? (
                  <p>
                    Rango salarial:<br></br>
                    <b>
                      RD$ {offerInfo?.salaryRange[0]} -{" "}
                      {offerInfo?.salaryRange[1]}
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
                <img src={profilePictureRoute} alt="Profile" />
              </div>
              <div className="dp-wrapper__text">
                <span className="dp-wrapper__title">{offererTitleRoute}</span>
                <div className="dp-wrapper__bullets">
                  <ul>
                    {personInfo?.location ? (
                      <li>
                        En <b> {personInfo?.location} </b>
                      </li>
                    ) : null}
                    {personInfo?.userType ? (
                      <li>{MyDictionary[personInfo?.userType]}</li>
                    ) : null}
                    {personInfo?.category?.name ? (
                      <li>{personInfo?.category?.name}</li>
                    ) : null}
                  </ul>
                </div>
                <ul className="dp-wrapper__tags">
                  {personInfo?.tags?.map((tag) => (
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
                {personInfo?.bio
                  ? personInfo?.bio
                  : "Los detalles del usuario no estan disponibles"}
              </p>
              <div className="dp-wrapper__contact">
                Contacto:
              <Link
                  to={profileRoute}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  {offererTitleRoute}
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
