import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Auth from "../../utils/authHelper";
import "./OfferPopup-Style.css";
import Tag from "../tag-components/Tag";

let MyDictionary = {};
MyDictionary["free"] = "Freelancer";
MyDictionary["fixed"] = "Fijo/Indefinido";

const OfferPopup = ({ offerInfo, organizationInformation }) => {
  return (
    <div>
      <div className="modal-wrapper">
        <div className="op-wrapper__up-content">
          {organizationInformation?.profilePicture ? (
            <img src={organizationInformation.profilePicture} alt="Offerpp" />
          ) : (
            <img src="https://i.imgur.com/lcHQ2QP.jpg" alt="Offerpp" />
          )}
          <div className="op-wrapper__text">
            <span>{offerInfo ? offerInfo.title : "Titulo no disponible"}</span>
            <ul>
              <li>
                Por <b>{organizationInformation.name}</b> en
                <b>
                  {organizationInformation
                    ? organizationInformation.location
                    : "Info no disponible"}
                </b>
              </li>
              <li>
                {offerInfo
                  ? MyDictionary[offerInfo.offerType]
                  : "Info no disponible"}
              </li>
              <li>
                {offerInfo ? offerInfo.closingDate : "Info no disponible"}
              </li>
            </ul>
            <ul className="op-wrapper_tags">
              {offerInfo.tags.map((tag) => (
                <Tag
                  key={tag._id}
                  text={tag.name}
                  theme="tag tag__text tag__text--gray"
                ></Tag>
              ))}
            </ul>
          </div>
        </div>
        <div className="op-wrapper__down-content">
          <span>Detalles de la oferta</span>
          <p>
            {offerInfo ? offerInfo.description : "Descripcion no disponible"}
          </p>
          <p className="op-wrapper__contact">
            Contacto:
            <br />
            <a href={`mailto:${organizationInformation.email}`}>
              {organizationInformation.email}
            </a>
            <b>{organizationInformation.phone}</b>
          </p>
          {/* <div className="op-wrapper__close-button-container">
              <button
                id="op-wrapper__close-button"
                onClick={() => setState(false)}
              >
                {" "}
                Cerrar
              </button>
              <label
                htmlFor="op-wrapper__close-button"
                className="op-wrapper__close-button"
              ></label>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default OfferPopup;
