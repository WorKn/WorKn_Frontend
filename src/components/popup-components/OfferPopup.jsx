import React, { useEffect, useState } from "react";
import "./OfferPopup-Style.css";
import Tag from "../tag-components/Tag";
import { Link } from "react-router-dom";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";

let MyDictionary = {};
MyDictionary["free"] = "Freelancer";
MyDictionary["fixed"] = "Fijo/Indefinido";

const OfferPopup = ({ offerInfo, organizationInformation }) => {
  const [profileRoute, setProfileRoute] = useState("");
  const [offererTitleRoute, setOffererTitleRoute] = useState("");
  const { state } = useStateMachine(updateAction);

  useEffect(() => {
    if (offerInfo.organization) {
      // setProfilePictureRoute(responseInfo?.organization?.profilePicture);
      setOffererTitleRoute(organizationInformation?.name);
      setProfileRoute(`/organizations/${organizationInformation?._id}`);
    } else {
      setOffererTitleRoute(
        state.userInformation.name + state.userInformation.lastname
      );
    }
  }, [offerInfo, organizationInformation, state.userInformation]);

  return (
    <div className="op-wrapper">
      <div className="op-wrapper__up-content">
        {organizationInformation?.profilePicture ? (
          <div className="op-wrapper__img">
            <img src={organizationInformation.profilePicture} alt="Offerpp" />
          </div>
        ) : (
          <div className="op-wrapper__img">
            <img src="https://i.imgur.com/lcHQ2QP.jpg" alt="Offerpp" />
          </div>
        )}
        <div className="op-wrapper__text">
          <span className="op-wrapper__title">
            {offerInfo ? offerInfo.title : "Titulo no disponible"}
          </span>
          <div className="op-wrapper__bullets">
            <ul>
              {/* <li>
                Por <b>{offererTitleRoute}</b>
                {organizationInformation?.location ? (
                  <span>
                    {" "}
                    en
                    <b>{organizationInformation.location}</b>
                  </span>
                ) : null}
              </li> */}
              <li>
                {offerInfo.offerType
                  ? MyDictionary[offerInfo.offerType]
                  : "Info no disponible"}
              </li>
              {offerInfo.createdAt ? (
                <li>Fecha de creación: {offerInfo.createdAt.slice(0, 10)}</li>
              ) : null}
              {offerInfo.closingDate ? (
                <li>Fecha de cierre: {offerInfo.closingDate.slice(0, 10)}</li>
              ) : null}
            </ul>
          </div>
          <ul className="op-wrapper_tags">
            {offerInfo.tags.map((tag) => (
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
          {offerInfo.description
            ? offerInfo.description
            : "Los detalles de la oferta no estan disponibles"}
        </p>
        {offerInfo?.salaryRange ? (
          <p className="op-wrapper__salary">
            Rango salarial:<br></br>
            <b>
              RD$ {offerInfo?.salaryRange[0]} - {offerInfo?.salaryRange[1]}
            </b>
          </p>
        ) : null}
        {offerInfo.organization ? (
          <p className="op-wrapper__contact">
            Contacto:
            <Link
              to={profileRoute}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              {offererTitleRoute}
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default OfferPopup;
