import React, { useState, useEffect } from "react";
import { acceptInteraction, rejectInteraction } from "../../utils/apiRequests";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
import Tag from "../tag-components/Tag";
import { Link } from "react-router-dom";

const InteractionPopup = ({ responseInfo }) => {
  const { state } = useStateMachine(updateAction);
  const [profilePictureRoute, setProfilePictureRoute] = useState("");
  const [offererTitleRoute, setOffererTitleRoute] = useState("");

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

  useEffect(() => {
    if (responseInfo.offer.organization) {
      setProfilePictureRoute(responseInfo?.offer?.organization?.profilePicture);
      setOffererTitleRoute(responseInfo?.offer?.organization?.name);
    } else {
      setProfilePictureRoute(responseInfo?.offer?.createdBy?.profilePicture);
      setOffererTitleRoute(responseInfo?.offer?.createdBy?.name);
    }
  }, [responseInfo]);

  return (
    <div>
      {typeof state.userInformation.userType !== "undefined" &&
      state.userInformation.userType === "applicant" ? (
        <div>
          {/* <h1>¿Te gustaría aceptar la oferta {responseInfo?.offer?.title}?</h1> */}
          {typeof responseInfo.state !== "undefined" &&
          responseInfo.state === "interested" ? (
            <div>
              <div className="op-wrapper__up-content">
                <img src={profilePictureRoute} alt="Offerpp" />
                <div className="op-wrapper__text">
                  <span className="op-wrapper__title">
                    {responseInfo?.offer?.title}
                  </span>
                  <div className="op-wrapper__bullets">
                    <ul>
                      <li>
                        Por <b>{offererTitleRoute} </b> en
                        <b> Santo Domingo</b>
                      </li>
                      <li>
                        {responseInfo
                          ? MyDictionary[responseInfo?.offer?.offerType]
                          : "Info no disponible"}
                      </li>
                      <li>
                        Fecha de cierre:
                        {responseInfo?.offer?.closingDate
                          ? `${responseInfo?.offer?.closingDate?.slice(0, 10)}`
                          : "Info no disponible"}
                      </li>
                    </ul>
                  </div>
                  <ul className="op-wrapper_tags">
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
              <div className="op-wrapper__down-content">
                <span className="op-wrapper__title op-wrapper__title--v2">
                  Detalles de la oferta
                </span>
                <p className="op-wrapper__downinfo">
                  {responseInfo
                    ? responseInfo?.offer?.description
                    : "Descripcion no disponible"}
                </p>
                <p className="op-wrapper__contact">
                  Contacto:
                  <Link
                    to={`/organizations/${responseInfo?.offer?.organization?._id}`}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    {offererTitleRoute}
                  </Link>
                </p>
              </div>
              {/* <div className="op-wrapper__button-content">
                <button
                  className="custom-button custom-button--dpa bg-green "
                  onClick={() => {
                    catchInteraction(responseInfo?._id);
                  }}
                >
                  Aceptar
                </button>
                <button
                  className="custom-button custom-button--dpa bg-red "
                  onClick={() => {
                    deleteInteraction(responseInfo?._id);
                  }}
                >
                  Rechazar
                </button>
              </div> */}
            </div>
          ) : (
            <div>
              <div className="op-wrapper__up-content">
                <img src={profilePictureRoute} alt="Offerpp" />
                <div className="op-wrapper__text">
                  <span className="op-wrapper__title">
                    {responseInfo?.offer?.title}
                  </span>
                  <div className="op-wrapper__bullets">
                    <ul>
                      <li>
                        Por <b>{offererTitleRoute} </b> en
                        <b> Santo Domingo</b>
                      </li>
                      <li>
                        {responseInfo
                          ? MyDictionary[responseInfo?.offer?.offerType]
                          : "Info no disponible"}
                      </li>
                      <li>
                        Fecha de cierre:
                        {responseInfo?.offer?.closingDate
                          ? `${responseInfo?.offer?.closingDate?.slice(0, 10)}`
                          : "Info no disponible"}
                      </li>
                    </ul>
                  </div>
                  <ul className="op-wrapper_tags">
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
              <div className="op-wrapper__down-content">
                <span className="op-wrapper__title op-wrapper__title--v2">
                  Detalles de la oferta
                </span>
                <p className="op-wrapper__downinfo">
                  {responseInfo
                    ? responseInfo?.offer?.description
                    : "Descripcion no disponible"}
                </p>
                <p className="op-wrapper__contact">
                  Contacto:
                  <Link
                    to={`/organizations/${responseInfo?.offer?.organization?._id}`}
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
            <div>
              <div className="op-wrapper__up-content">
                <img
                  src={responseInfo?.applicant?.profilePicture}
                  alt="Offerpp"
                />
                <div className="op-wrapper__text">
                  <span className="op-wrapper__title">
                    {responseInfo?.applicant?.name}{" "}
                    {responseInfo?.applicant?.lastname}
                  </span>
                  <div className="op-wrapper__bullets">
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
                  <ul className="op-wrapper_tags">
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
              <div className="op-wrapper__down-content">
                <span className="op-wrapper__title op-wrapper__title--v2">
                  Biografía
                </span>
                <p className="op-wrapper__downinfo">
                  {responseInfo?.applicant
                    ? responseInfo?.applicant?.bio
                    : "Biografía no disponible"}
                </p>
                <p className="op-wrapper__contact">
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

              {/* <div className="op-wrapper__button-content">
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
              </div> */}
            </div>
          ) : (
            <div>
              <div className="op-wrapper__up-content">
                <img
                  src={responseInfo?.applicant?.profilePicture}
                  alt="Offerpp"
                />
                <div className="op-wrapper__text">
                  <span className="op-wrapper__title">
                    {responseInfo?.applicant?.name}{" "}
                    {responseInfo?.applicant?.lastname}
                  </span>
                  <div className="op-wrapper__bullets">
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
                  <ul className="op-wrapper_tags">
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
              <div className="op-wrapper__down-content">
                <span className="op-wrapper__title op-wrapper__title--v2">
                  Biografía
                </span>
                <p className="op-wrapper__downinfo">
                  {responseInfo?.applicant
                    ? responseInfo?.applicant?.bio
                    : "Biografía no disponible"}
                </p>
                <p className="op-wrapper__contact">
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

              {/* <div className="op-wrapper__button-content">
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
              </div> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractionPopup;
