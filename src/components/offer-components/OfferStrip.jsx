import React from "react";
import "./OfferStrip-Style.css";
import Tag from "../tag-components/Tag";

let MyDictionary = {};
MyDictionary["free"] = "Freelancer";
MyDictionary["fixed"] = "Fijo/Indefinido";

const OfferStrip = ({ offerInfo, organizationInformation }) => {
  //optional chanining JS, o si
  // chekear si offer.
  //   console.log(offerInfo?.tags);
  let shortOfferDescription = "";
  let shortOfferTitle = "";
  shortOfferTitle = offerInfo.title;
  shortOfferDescription = offerInfo.description;

  if (offerInfo.description.length > 43) {
    shortOfferDescription = `${shortOfferDescription.slice(0, 44)}...`;
  }

  if (offerInfo.title.length > 38) {
    shortOfferTitle = `${shortOfferTitle.slice(0, 39)}...`;
  }

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
        {offerInfo ? MyDictionary[offerInfo.offerType] : "Info no disponible"}
      </span>
      <span className="offerstrip__vl offerstrip__vl--1"></span>
      <span className="offerstrip__text offerstrip__type">
        {offerInfo ? shortOfferTitle : "Titulo no disponible"}
      </span>
      <span className="offerstrip__vl offerstrip__vl--2"></span>
      <span className="offerstrip__text offerstrip__offer">
        {offerInfo ? shortOfferDescription : "Descripcion no disponible"}
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
