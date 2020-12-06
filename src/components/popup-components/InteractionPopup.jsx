import React, { useState, useEffect } from "react";
import { acceptInteraction, rejectInteraction } from "../../utils/apiRequests";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
import Tag from "../tag-components/Tag";
import { Link } from "react-router-dom";
// import "./InteractionPopup-Style.css";

const InteractionPopup = ({ responseInfo }) => {
  const { state } = useStateMachine(updateAction);
  const [profilePictureRoute, setProfilePictureRoute] = useState("");
  const [offererTitleRoute, setOffererTitleRoute] = useState("");
  const [profileRoute, setProfileRoute] = useState("");

  const catchInteraction = () => {
    acceptInteraction(responseInfo._id).then((res) => {
      console.log(res);
    });
  };
  const deleteInteraction = () => {
    rejectInteraction(responseInfo._id).then((res) => {
      console.log(res);
    });
  };

  let MyDictionary = {};
  MyDictionary["free"] = "Freelancer";
  MyDictionary["fixed"] = "Fijo/Indefinido";
  MyDictionary["applicant"] = "Aplicante";

  useEffect(() => {
    if (responseInfo.offer.organization) {
      setProfilePictureRoute(responseInfo?.offer?.organization?.profilePicture);
      setOffererTitleRoute(responseInfo?.offer?.organization?.name);
      setProfileRoute(
        `/organizations/${responseInfo?.offer?.organization?._id}`
      );
    } else {
      setProfilePictureRoute(responseInfo?.offer?.createdBy?.profilePicture);
      setOffererTitleRoute(responseInfo?.offer?.createdBy?.name);
      setProfileRoute(`/users/${responseInfo?.offer?.createdBy?._id}`);
    }
  }, [responseInfo]);

  return (
    <div className="dp-wrapper">
      {typeof state.userInformation.userType !== "undefined" &&
      state.userInformation.userType === "applicant" ? (
        <div>
          {/* <h1>¿Te gustaría aceptar la oferta {responseInfo?.offer?.title}?</h1> */}
          {typeof responseInfo.state !== "undefined" &&
          responseInfo.state === "interested" ? (
            <div className="dp-wrapper__child ">
              <div className="dp-wrapper__up-content">
                <div className="dp-wrapper__img">
                  <img src={profilePictureRoute} alt="Offerpp" />
                </div>
                <div className="dp-wrapper__text">
                  <span className="dp-wrapper__title">
                    {responseInfo?.offer?.title}
                  </span>
                  <div className="dp-wrapper__bullets">
                    <ul>
                      Por <b>{offererTitleRoute} </b>
                      {responseInfo?.offer?.location ? (
                        <span>
                          {" "}
                          en <b>{responseInfo?.offer?.location}</b>
                        </span>
                      ) : null}
                      <li>
                        {responseInfo
                          ? MyDictionary[responseInfo?.offer?.offerType]
                          : "Info no disponible"}
                      </li>
                      {responseInfo?.offer?.createdAt ? (
                        <li>
                          Fecha de creación:{" "}
                          {responseInfo?.offer?.createdAt?.slice(0, 10)}
                        </li>
                      ) : null}
                      {responseInfo?.offer?.closingDate ? (
                        <li>
                          Fecha de cierre:{" "}
                          {responseInfo?.offer?.closingDate?.slice(0, 10)}
                        </li>
                      ) : null}
                    </ul>
                  </div>
                  <ul className="dp-wrapper__tags">
                    {responseInfo?.offer?.tags?.map((tag) => (
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
                    ? responseInfo?.offer?.description
                    : "Los detalles de la oferta no estan disponibles"}
                </p>
                {responseInfo?.offer?.salaryRange ? (
                  <p className="dp-wrapper__salary">
                    Rango salarial:<br></br>
                    <b>
                      RD$ {responseInfo?.offer?.salaryRange[0]} -{" "}
                      {responseInfo?.offer?.salaryRange[1]}
                    </b>
                  </p>
                ) : null}
                <p className="dp-wrapper__contact ">
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
              <div className="dp-wrapper__button-content dp-wrapper__button-content--ip">
                <button
                  className="custom-button custom-button--dpa bg-green "
                  onClick={() => {
                    catchInteraction(responseInfo?._id);
                  }}
                >
                  Aceptar
                </button>
                <button
                  className="custom-button custom-button--dpa custom-button--dpar bg-red "
                  onClick={() => {
                    deleteInteraction(responseInfo?._id);
                  }}
                >
                  Rechazar
                </button>
              </div>
            </div>
          ) : (
            <div className="dp-wrapper__child ">
              <div className="dp-wrapper__up-content">
                <div className="dp-wrapper__img">
                  <img src={profilePictureRoute} alt="Offerpp" />
                </div>
                <div className="dp-wrapper__text">
                  <span className="dp-wrapper__title">
                    {responseInfo?.offer?.title}
                  </span>
                  <div className="dp-wrapper__bullets">
                    <ul>
                      Por <b>{offererTitleRoute} </b>
                      {responseInfo?.offer?.location ? (
                        <span>
                          {" "}
                          en <b>{responseInfo?.offer?.location}</b>
                        </span>
                      ) : null}
                      <li>
                        {responseInfo
                          ? MyDictionary[responseInfo?.offer?.offerType]
                          : "Info no disponible"}
                      </li>
                      <li>
                        Fecha de creacion:{" "}
                        {responseInfo?.offer?.createdAt
                          ? `${responseInfo?.offer?.createdAt?.slice(0, 10)}`
                          : "Info no disponible"}
                      </li>
                      <li>
                        Fecha de cierre:{" "}
                        {responseInfo?.offer?.closingDate
                          ? `${responseInfo?.offer?.closingDate?.slice(0, 10)}`
                          : "Info no disponible"}
                      </li>
                    </ul>
                  </div>
                  <ul className="dp-wrapper__tags">
                    {responseInfo?.offer?.tags?.map((tag) => (
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
                <p className="dp-wrapper__downinfo">
                  {responseInfo
                    ? responseInfo?.offer?.description
                    : "Los detalles de la oferta no estan disponibles"}
                </p>
                {responseInfo?.offer?.salaryRange ? (
                  <p className="dp-wrapper__salary">
                    Rango salarial:<br></br>
                    <b>
                      RD$ {responseInfo?.offer?.salaryRange[0]} -{" "}
                      {responseInfo?.offer?.salaryRange[1]}
                    </b>
                  </p>
                ) : null}
                <p className="dp-wrapper__contact">
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
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* <h1>¿Te gustaría aceptar la oferta {responseInfo?.offer?.title}?</h1> */}
          {typeof responseInfo.state !== "undefined" &&
          responseInfo.state === "applied" ? (
            <div className="dp-wrapper__child">
              <div className="dp-wrapper__up-content">
                <div className="dp-wrapper__img">
                  <img
                    src={responseInfo?.applicant?.profilePicture}
                    alt="applicantPicture"
                  />{" "}
                </div>
                <div className="dp-wrapper__text">
                  <span className="dp-wrapper__title">
                    {responseInfo?.applicant?.name}{" "}
                    {responseInfo?.applicant?.lastname}
                  </span>
                  <div className="dp-wrapper__bullets">
                    <ul>
                      <li>
                        En
                        <b> Santo Domingo</b>
                      </li>
                      <li>
                        {responseInfo?.applicant?.userType
                          ? MyDictionary[responseInfo?.applicant?.userType]
                          : "Info no disponible"}
                      </li>
                      <li>
                        {responseInfo?.applicant?.category?.name
                          ? responseInfo?.applicant?.category?.name
                          : "Info no disponible"}
                      </li>
                    </ul>
                  </div>
                  <ul className="dp-wrapper__tags">
                    {responseInfo?.applicant?.tags.map((tag) => (
                      <Tag
                        key={tag.id}
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
                  {responseInfo?.applicant
                    ? responseInfo?.applicant?.bio
                    : "Detalles del usuario no disponible"}
                </p>
                <p className="dp-wrapper__contact">
                  Contacto:
                  <Link
                    to={`/users/${responseInfo?.applicant?._id}`}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    {responseInfo?.applicant?.name}{" "}
                    {responseInfo?.applicant?.lastname}
                  </Link>
                </p>
              </div>
              <div className="dp-wrapper__button-content dp-wrapper__button-content--ip">
                <button
                  className="custom-button custom-button--dpa bg-green "
                  onClick={() => {
                    catchInteraction(responseInfo?._id);
                  }}
                >
                  Aceptar
                </button>
                <button
                  className="custom-button custom-button--dpa bg-red"
                  onClick={() => {
                    deleteInteraction(responseInfo?._id);
                  }}
                >
                  Rechazar
                </button>
              </div>
            </div>
          ) : (
            <div className="dp-wrapper__child ">
              <div className="dp-wrapper__up-content">
                <div className="dp-wrapper__img ">
                  <img
                    src={responseInfo?.applicant?.profilePicture}
                    alt="Offerpp"
                  />
                </div>
                <div className="dp-wrapper__text">
                  <span className="dp-wrapper__title">
                    {responseInfo?.applicant?.name}{" "}
                    {responseInfo?.applicant?.lastname}
                  </span>
                  <div className="dp-wrapper__bullets">
                    <ul>
                      <li>
                        En
                        <b> Santo Domingo</b>
                      </li>
                      <li>
                        {responseInfo?.applicant?.userType
                          ? MyDictionary[responseInfo?.applicant?.userType]
                          : "Info no disponible"}
                      </li>
                      <li>
                        {responseInfo?.applicant?.category?.name
                          ? responseInfo?.applicant?.category?.name
                          : "Info no disponible"}
                      </li>
                    </ul>
                  </div>
                  <ul className="dp-wrapper__tags">
                    {responseInfo?.applicant?.tags.map((tag) => (
                      <Tag
                        key={tag.id}
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
                  {responseInfo?.applicant
                    ? responseInfo?.applicant?.bio
                    : "Detalles del usuario no disponible"}
                </p>
                <p className="dp-wrapper__contact">
                  Contacto:
                  <Link
                    to={`/users/${responseInfo?.applicant?._id}`}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    {responseInfo?.applicant?.name}{" "}
                    {responseInfo?.applicant?.lastname}
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractionPopup;
