import React from "react";
import "./OfferStrip-Style.css";
import Tag from "../tag-components/Tag";

const capitalizeFirstLetter = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const OfferStrip = ({ offerInfo, organizationInformation }) => {
  //optional chanining JS, o si
  // chekear si offer.
  //   console.log(offerInfo?.tags);

  return (
    <div className="offerstrip">
      {organizationInformation?.profilePicture ? (
        <img
          src={organizationInformation.profilePicture}
          className="offerstrip__picture"
          alt="Offerpp"
        />
      ) : (
        <img
          src="https://i.imgur.com/lcHQ2QP.jpg"
          className="offerstrip__picture"
          alt="Offerpp"
        />
      )}

      <span className="offerstrip__text offerstrip__org">
        {offerInfo
          ? capitalizeFirstLetter(offerInfo.offerType)
          : "Info no disponible"}
      </span>
      <span className="offerstrip__vl offerstrip__vl--1"></span>
      <span className="offerstrip__text offerstrip__type">
        {offerInfo ? offerInfo.title : "Titulo no disponible"}
      </span>
      <span className="offerstrip__vl offerstrip__vl--2"></span>
      <span className="offerstrip__text offerstrip__offer">
        {offerInfo ? offerInfo.description : "Descripcion no disponible"}
      </span>
      <span className="offerstrip__vl offerstrip__vl--3"></span>
      <div className="offerstrip__tagscontainer">
        {offerInfo.tags.map((tag) => (
          <Tag
            key={tag._id}
            text={tag.name}
            theme="tag tag__text tag__text--gray"
          ></Tag>
        ))}
      </div>

      <span className="offerstrip__vl offerstrip__vl--4"></span>
      <span className="offerstrip__text offerstrip__edit">Editar</span>
      <i className="fa fa-times offerstrip__icon offerstrip__delete"></i>
    </div>
  );
};

export default OfferStrip;
