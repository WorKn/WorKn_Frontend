import React from "react";
import "./OfferMini-Style.css";
import Tag from "../tag-components/Tag";

let MyDictionary = {};
MyDictionary["free"] = "Freelancer";
MyDictionary["fixed"] = "Fijo/Indefinido";

const OfferMini = ({ organizationInformation, offerInfo }) => {
  return (
    <div className="offercard__wrapper offercard__wrapper--mini">
      <div className="offercard__header offercard__header--mini">
        <div className="offerminipp">
          {organizationInformation?.profilePicture ? (
            <img
              src={organizationInformation.profilePicture}
              className="offercard__picture offercard__picture--mini"
              alt="Offerpp"
            />
          ) : (
            <img
              src="https://i.imgur.com/lcHQ2QP.jpg"
              className="offercard__picture offercard__picture--mini"
              alt="Offerpp"
            />
          )}
        </div>
        <div className="offercard__text offercard__text--mini">
          <span className="offercard__text--title offercard__text--title--mini">
            {offerInfo ? offerInfo.title : "Titulo no disponible"}
          </span>
          <span className="offercard__data offercard__data--mini">
            {offerInfo
              ? MyDictionary[offerInfo.offerType]
              : "Info no disponible"}
          </span>
        </div>
      </div>
      <div className="offercard__tags offercard__tags--mini">
        {offerInfo.tags.map((tag) => (
          <Tag
            key={tag._id}
            text={tag.name}
            theme="tag tag--mini tag__text tag__text--gray tag__text--mini "
          ></Tag>
        ))}
      </div>
    </div>
  );
};

export default OfferMini;
