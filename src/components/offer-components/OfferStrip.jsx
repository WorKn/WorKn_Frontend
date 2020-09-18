import React from "react";
import "./OfferStrip-Style.css";
import Tag from "../tag-components/Tag";
const OfferStrip = (props) => {
  return (
    <div className="offerstrip">
      <img
        src="https://i.imgur.com/lcHQ2QP.jpg"
        className="offerstrip__picture"
        alt="Offerpp"
      />
      <span className="offerstrip__text offerstrip__org">{props.name}</span>
      <span className="offerstrip__vl offerstrip__vl--1"></span>
      <span className="offerstrip__text offerstrip__type">Freelancer</span>
      <span className="offerstrip__vl offerstrip__vl--2"></span>
      <span className="offerstrip__text offerstrip__offer">
        Buscamos fotógrafo para asistir en cobertura de evento
      </span>
      <span className="offerstrip__vl offerstrip__vl--3"></span>
      <div className="offerstrip__tagscontainer">
        <Tag text="Tag1" theme="tag tag__text tag__text--gray"></Tag>
        <Tag text="Tag2" theme="tag tag__text tag__text--gray"></Tag>
        <Tag text="Tag3" theme="tag tag__text tag__text--gray"></Tag>
        <Tag text="Tag4" theme="tag tag__text tag__text--gray"></Tag>
      </div>

      <span className="offerstrip__vl offerstrip__vl--4"></span>
      <span className="offerstrip__text offerstrip__edit">Editar</span>
      <i className="fa fa-times offerstrip__icon offerstrip__delete"></i>
    </div>
  );
};

export default OfferStrip;
