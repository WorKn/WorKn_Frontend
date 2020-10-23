import React, { useEffect, useState } from "react";
import "./OfferPopup-Style.css";
import Tag from "../tag-components/Tag";
import { Link } from "react-router-dom";
import { getMe } from "../../utils/apiRequests";

let MyDictionary = {};
MyDictionary["free"] = "Freelancer";
MyDictionary["fixed"] = "Fijo/Indefinido";

const OfferPopup = ({ offerInfo, organizationInformation }) => {
  const [profileRoute, setProfileRoute] = useState("");
  const [offererTitleRoute, setOffererTitleRoute] = useState("");

  useEffect(() => {
    if (offerInfo.organization) {
      // setProfilePictureRoute(responseInfo?.organization?.profilePicture);
      setOffererTitleRoute(organizationInformation?.name);
      setProfileRoute(`/organizations/${organizationInformation?._id}`);
    } else {
      getMe().then((res) => {
        setOffererTitleRoute(
          res?.data?.data?.data?.name + res?.data?.data?.data?.lastname
        );
        setProfileRoute(`/users/${res?.data?.data?.data?._id}`);
      });
    }
  }, [offerInfo, organizationInformation]);

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
              <li>
                Por <b>{offererTitleRoute}</b>
                {organizationInformation?.location ? " en " : " en "}
                <b>
                  {organizationInformation?.location
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
                Fecha de creación:{" "}
                {offerInfo
                  ? `${offerInfo.createdAt.slice(0, 10)}`
                  : "Info no disponible"}
              </li>
              <li>
                Fecha de cierre:{" "}
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
        <p className="op-wrapper__salary">
          Rango salarial:
          <b>
            RD${" "}
            {offerInfo?.salaryRange
              ? offerInfo?.salaryRange[0]
              : "Descripcion no disponible"}{" "}
            -{" "}
            {offerInfo?.salaryRange
              ? offerInfo?.salaryRange[1]
              : "Descripcion no disponible"}
          </b>
        </p>
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
      </div>
    </div>
  );
};

export default OfferPopup;
