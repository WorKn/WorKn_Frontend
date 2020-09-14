import React from "react";
import "./OfferStrip-Style.css";
import Tag from "../tag-components/Tag";
const OfferStrip = ({ profilePic, offerInfo, organizationName }) => {
  //optional chanining JS, o si
  // chekear si offer.
  //   console.log(offerInfo?.tags);
  return (
    <div className="offerstrip">
      {profilePic ? (
        <img src={profilePic} className="offerstrip__picture" alt="Offerpp" />
      ) : (
        <img
          src="https://i.imgur.com/lcHQ2QP.jpg"
          className="offerstrip__picture"
          alt="Offerpp"
        />
      )}
      {/* <img
        src="https://i.imgur.com/lcHQ2QP.jpg"
        className="offerstrip__picture"
        alt="Offerpp"
      /> */}
      <span className="offerstrip__text offerstrip__org">
        {organizationName}
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
          <Tag text={tag.name} theme="tag tag__text tag__text--gray"></Tag>
        ))}
        {/* <Tag
          text={offerInfo?.tags[0].name}
          theme="tag tag__text tag__text--gray"
        ></Tag>
        <Tag text="Tag2" theme="tag tag__text tag__text--gray"></Tag>
        <Tag text="Tag3" theme="tag tag__text tag__text--gray"></Tag> */}
      </div>

      <span className="offerstrip__vl offerstrip__vl--4"></span>
      <span className="offerstrip__text offerstrip__edit">Editar</span>
      <i className="fa fa-times offerstrip__icon offerstrip__delete"></i>
    </div>
  );
};

export default OfferStrip;
