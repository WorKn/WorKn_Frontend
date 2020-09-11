import React from "react";
import "./OfferStrip-Style.css";
import Tag from "../tag-components/Tag";
const OfferStrip = () => {
  return (
    <div className="offerstrip">
      <img
        src="https://i.imgur.com/lcHQ2QP.jpg"
        className="offerstrip__picture"
        alt="Offerpp"
      />
      <span className="offerstrip__text offerstrip__org">Organización</span>
      <span className="offerstrip__vl offerstrip__vl--1"></span>
      <span className="offerstrip__text offerstrip__type">Freelance</span>
      <span className="offerstrip__vl offerstrip__vl--2"></span>
      <span className="offerstrip__text offerstrip__offer">
        Buscamos fotógrafo para asistir en cobertura de evento
      </span>
      <span className="offerstrip__vl offerstrip__vl--3"></span>
      <div className="offerstrip__tagscontainer">
        <Tag></Tag>
        <Tag></Tag>
        <Tag></Tag>
        <Tag></Tag>
      </div>

      <span className="offerstrip__vl offerstrip__vl--4"></span>
      <span className="offerstrip__text offerstrip__edit">Editar</span>
      <i className="fa fa-times offerstrip__icon offerstrip__delete"></i>
    </div>
  );
};

export default OfferStrip;
