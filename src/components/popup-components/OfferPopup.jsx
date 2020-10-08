import React from "react";
import "./OfferPopup-Style.css";
import Tag from "../tag-components/Tag";

let MyDictionary = {};
MyDictionary["free"] = "Freelancer";
MyDictionary["fixed"] = "Fijo/Indefinido";

const OfferPopup = ({ offerInfo, organizationInformation }) => {
  return (
    <div className="popup-wrapper">
      <div className="op-wrapper__up-content">
        {organizationInformation?.profilePicture ? (
          <img src={organizationInformation.profilePicture} alt="Offerpp" />
        ) : (
          <img src="https://i.imgur.com/lcHQ2QP.jpg" alt="Offerpp" />
        )}
        <div className="op-wrapper__text">
          <span className="op-wrapper__title">
            {offerInfo ? offerInfo.title : "Titulo no disponible"}
          </span>
          <div className="op-wrapper__bullets">
            <ul>
              <li>
                Por <b>{organizationInformation.name}</b>
                {organizationInformation.location ? " en " : null}
                <b>
                  {organizationInformation
                    ? organizationInformation.location
                    : " Info no disponible"}
                </b>
              </li>
              <li>
                {offerInfo
                  ? MyDictionary[offerInfo.offerType]
                  : "Info no disponible"}
              </li>
              <li>
                {offerInfo
                  ? `${offerInfo.closingDate.slice(0, 10)}`
                  : "Info no disponible"}
              </li>
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
          {offerInfo ? offerInfo.description : "Descripcion no disponible"}
        </p>
        <p className="op-wrapper__contact">
          Contacto:
          <a href={`mailto:${organizationInformation.email}`}>
            {organizationInformation.email}
          </a>
          <b>{organizationInformation.phone}</b>
        </p>
      </div>
      {/* <div className="op-wrapper__button-content">
        <span className="op-wrapper__accept">Contacar</span>
        <span className="op-wrapper__cancel">Descartar</span>
      </div> */}
    </div>
  );
};

export default OfferPopup;
